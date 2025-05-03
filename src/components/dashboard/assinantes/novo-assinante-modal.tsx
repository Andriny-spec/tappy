'use client';

import { useState, useEffect } from 'react';
import { Check, ChevronsUpDown, Loader, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface NovoAssinanteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  assinanteData?: any; // Dados do assinante para edição
  editing?: boolean; // Flag que indica se está editando
}

interface Usuario {
  id: string;
  name: string;
  email: string;
}

interface Plataforma {
  id: string;
  name: string;
  slug: string;
  url: string;
}

interface Plano {
  id: string;
  name: string;
  platformId: string;
  price: number;
  interval: string;
  description: string;
}

export function NovoAssinanteModal({ isOpen, onClose, onSuccess, assinanteData, editing = false }: NovoAssinanteModalProps) {
  const [assinanteTipo, setAssinanteTipo] = useState('existente');
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [plataformas, setPlataformas] = useState<Plataforma[]>([]);
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [planosFiltrados, setPlanosFiltrados] = useState<Plano[]>([]);
  
  // Usuário selecionado ou novo usuário
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<string>('');
  const [usuarioOpen, setUsuarioOpen] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [novoTelefone, setNovoTelefone] = useState('');

  // Plataforma e plano
  const [plataformaSelecionada, setPlataformaSelecionada] = useState<string>('');
  const [planoSelecionado, setPlanoSelecionado] = useState<string>('');

  useEffect(() => {
    // Buscar usuários, plataformas e planos quando o modal estiver aberto
    if (isOpen) {
      const fetchData = async () => {
        setLoading(true);
        try {
          // Buscar usuários
          const usersResponse = await fetch('/api/usuarios');
          if (usersResponse.ok) {
            const usersData = await usersResponse.json();
            setUsuarios(usersData.usuarios);
          }

          // Buscar plataformas
          const platformsResponse = await fetch('/api/plataformas');
          if (platformsResponse.ok) {
            const platformsData = await platformsResponse.json();
            setPlataformas(platformsData.plataformas);
          }

          // Buscar planos
          const plansResponse = await fetch('/api/planos');
          if (plansResponse.ok) {
            const plansData = await plansResponse.json();
            setPlanos(plansData.planos);
            
            // Se estiver em modo de edição e tiver dados do assinante,
            // preencher os campos com os dados recebidos
            if (editing && assinanteData) {
              // Preenchendo campos de usuário
              setAssinanteTipo('existente');
              setUsuarioSelecionado(assinanteData.id);
              
              // Preenchendo plataforma e plano
              setTimeout(() => {
                const plataforma = plataformas.find(
                  (p: Plataforma) => p.name === assinanteData.plataforma
                );
                
                if (plataforma) {
                  setPlataformaSelecionada(plataforma.id);
                  
                  // Após selecionar a plataforma, vamos buscar o plano
                  setTimeout(() => {
                    const filtered = planos.filter(
                      (p: Plano) => p.platformId === plataforma.id && p.name === assinanteData.plano
                    );
                    
                    if (filtered.length > 0) {
                      setPlanoSelecionado(filtered[0].id);
                    }
                  }, 100);
                }
              }, 100);
            }
          }
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
          toast.error('Falha ao carregar dados necessários');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isOpen, editing, assinanteData]);

  // Filtrar planos de acordo com a plataforma selecionada
  useEffect(() => {
    if (plataformaSelecionada) {
      const filtered = planos.filter(plano => plano.platformId === plataformaSelecionada);
      setPlanosFiltrados(filtered);
      setPlanoSelecionado(''); // Limpar plano selecionado quando trocar de plataforma
    } else {
      setPlanosFiltrados([]);
    }
  }, [plataformaSelecionada, planos]);

  const resetForm = () => {
    setAssinanteTipo('existente');
    setUsuarioSelecionado('');
    setNovoNome('');
    setNovoEmail('');
    setNovoTelefone('');
    setPlataformaSelecionada('');
    setPlanoSelecionado('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    // Validar dados
    if (assinanteTipo === 'existente' && !usuarioSelecionado) {
      toast.error('Selecione um usuário existente');
      return;
    }

    if (assinanteTipo === 'novo' && (!novoNome || !novoEmail)) {
      toast.error('Preencha nome e email do novo usuário');
      return;
    }

    if (!plataformaSelecionada) {
      toast.error('Selecione uma plataforma');
      return;
    }

    if (!planoSelecionado) {
      toast.error('Selecione um plano');
      return;
    }

    setLoading(true);

    try {
      // Preparar dados
      const dadosAssinante = {
        tipo: assinanteTipo,
        usuarioId: assinanteTipo === 'existente' ? usuarioSelecionado : undefined,
        novoUsuario: assinanteTipo === 'novo' ? {
          nome: novoNome,
          email: novoEmail,
          telefone: novoTelefone
        } : undefined,
        plataformaId: plataformaSelecionada,
        planoId: planoSelecionado
      };

      // Enviar para a API
      const response = await fetch('/api/assinantes/novo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAssinante),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao criar assinante');
      }

      const data = await response.json();
      
      toast.success('Assinante adicionado com sucesso');

      // Forçar atualização da página para mostrar o novo assinante na tabela
      window.location.href = window.location.pathname + '?t=' + Date.now();
      
      resetForm();
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Erro ao criar assinante:', error);
      toast.error(error instanceof Error ? error.message : 'Falha ao criar assinante');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Assinante</DialogTitle>
          <DialogDescription>
            Adicione um assinante existente ou crie um novo para atribuir um plano.
          </DialogDescription>
        </DialogHeader>

        {loading && !usuarios.length ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader className="h-8 w-8 animate-spin mb-4 text-primary" />
            <p className="text-muted-foreground">Carregando dados...</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 py-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Tipo de Assinante</Label>
                <RadioGroup
                  value={assinanteTipo}
                  onValueChange={setAssinanteTipo}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setAssinanteTipo('existente')}>
                    <RadioGroupItem value="existente" id="usuario-existente" className="text-[#25D366]" />
                    <Label htmlFor="usuario-existente" className="cursor-pointer font-medium">Usuário Existente</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setAssinanteTipo('novo')}>
                    <RadioGroupItem value="novo" id="novo-usuario" className="text-[#25D366]" />
                    <Label htmlFor="novo-usuario" className="cursor-pointer font-medium">Novo Usuário</Label>
                  </div>
                </RadioGroup>
              </div>

              {assinanteTipo === 'existente' ? (
                <div className="space-y-2">
                  <Label>Selecionar Usuário</Label>
                  <Popover open={usuarioOpen} onOpenChange={setUsuarioOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={usuarioOpen}
                        className="w-full justify-between"
                      >
                        {usuarioSelecionado
                          ? usuarios.find((user) => user.id === usuarioSelecionado)?.name || "Selecione um usuário"
                          : "Selecione um usuário"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Buscar usuário..." />
                        <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
                        <CommandGroup className="max-h-[300px] overflow-auto">
                          {usuarios.map((user) => (
                            <CommandItem
                              key={user.id}
                              value={user.id}
                              onSelect={() => {
                                setUsuarioSelecionado(user.id);
                                setUsuarioOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  usuarioSelecionado === user.id ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <div className="flex flex-col">
                                <span>{user.name}</span>
                                <span className="text-xs text-muted-foreground">{user.email}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <div className="grid gap-4 pt-1">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-sm font-medium">Nome</Label>
                    <div className="relative">
                      <Input
                        id="nome"
                        placeholder="Nome do usuário"
                        value={novoNome}
                        onChange={(e) => setNovoNome(e.target.value)}
                        className="h-10 pl-8 border-gray-200 focus:border-[#25D366] focus:ring-[#25D366]/20"
                      />
                      <div className="absolute left-2.5 top-2.5 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@exemplo.com"
                        value={novoEmail}
                        onChange={(e) => setNovoEmail(e.target.value)}
                        className="h-10 pl-8 border-gray-200 focus:border-[#25D366] focus:ring-[#25D366]/20"
                      />
                      <div className="absolute left-2.5 top-2.5 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone" className="text-sm font-medium">Telefone (opcional)</Label>
                    <div className="relative">
                      <Input
                        id="telefone"
                        placeholder="(00) 00000-0000"
                        value={novoTelefone}
                        onChange={(e) => setNovoTelefone(e.target.value)}
                        className="h-10 pl-8 border-gray-200 focus:border-[#25D366] focus:ring-[#25D366]/20"
                      />
                      <div className="absolute left-2.5 top-2.5 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 mt-2">
                <Label htmlFor="plataforma" className="text-sm font-medium">Plataforma</Label>
                <Select 
                  value={plataformaSelecionada} 
                  onValueChange={setPlataformaSelecionada}
                >
                  <SelectTrigger id="plataforma" className="h-10 border-gray-200 focus:border-[#25D366] focus:ring-[#25D366]/20">
                    <SelectValue placeholder="Selecione uma plataforma" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200">
                    <SelectGroup>
                      <SelectLabel>Plataformas</SelectLabel>
                      {plataformas.map((plataforma) => (
                        <SelectItem key={plataforma.id} value={plataforma.id}>
                          <span className="font-medium">{plataforma.name}</span> <span className="text-xs text-gray-500">({plataforma.url})</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="plano" className="text-sm font-medium">Plano</Label>
                <Select 
                  value={planoSelecionado} 
                  onValueChange={setPlanoSelecionado}
                  disabled={!plataformaSelecionada}
                >
                  <SelectTrigger id="plano" className="h-10 border-gray-200 focus:border-[#25D366] focus:ring-[#25D366]/20">
                    <SelectValue placeholder={!plataformaSelecionada ? "Selecione uma plataforma primeiro" : planosFiltrados.length === 0 ? "Nenhum plano disponível" : "Selecione um plano"} />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200">
                    {planosFiltrados.length === 0 ? (
                      <div className="p-2 text-center text-sm text-gray-500">
                        Nenhum plano disponível para esta plataforma
                      </div>
                    ) : (
                      <SelectGroup>
                        <SelectLabel>Planos disponíveis</SelectLabel>
                        {planosFiltrados.map((plano) => (
                          <SelectItem key={plano.id} value={plano.id}>
                            <div className="flex justify-between w-full">
                              <span className="font-medium">{plano.name}</span> 
                              <span className="text-[#25D366] font-semibold">R$ {plano.price.toFixed(2).replace('.', ',')}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    )}
                  </SelectContent>
                </Select>
                {plataformaSelecionada && planosFiltrados.length === 0 && (
                  <p className="text-xs text-amber-600">Nenhum plano cadastrado para esta plataforma. Cadastre planos primeiro.</p>
                )}
              </div>
            </div>

            <DialogFooter className="flex justify-end gap-2 pt-4 border-t mt-4">
              <Button 
                variant="outline" 
                onClick={handleClose}
                className="border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={loading}
                className="bg-[#25D366] hover:bg-[#20BD59] text-white font-medium transition-colors"
              >
                {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                Adicionar Assinante
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
