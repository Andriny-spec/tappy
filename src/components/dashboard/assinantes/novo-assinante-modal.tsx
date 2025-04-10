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

export function NovoAssinanteModal({ isOpen, onClose, onSuccess }: NovoAssinanteModalProps) {
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
  }, [isOpen]);

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
              <div className="space-y-2">
                <Label>Tipo de Assinante</Label>
                <RadioGroup
                  value={assinanteTipo}
                  onValueChange={setAssinanteTipo}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="existente" id="usuario-existente" />
                    <Label htmlFor="usuario-existente">Usuário Existente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="novo" id="novo-usuario" />
                    <Label htmlFor="novo-usuario">Novo Usuário</Label>
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
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                      id="nome"
                      placeholder="Nome do usuário"
                      value={novoNome}
                      onChange={(e) => setNovoNome(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@exemplo.com"
                      value={novoEmail}
                      onChange={(e) => setNovoEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone (opcional)</Label>
                    <Input
                      id="telefone"
                      placeholder="(00) 00000-0000"
                      value={novoTelefone}
                      onChange={(e) => setNovoTelefone(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="plataforma">Plataforma</Label>
                <Select 
                  value={plataformaSelecionada} 
                  onValueChange={setPlataformaSelecionada}
                >
                  <SelectTrigger id="plataforma">
                    <SelectValue placeholder="Selecione uma plataforma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Plataformas</SelectLabel>
                      {plataformas.map((plataforma) => (
                        <SelectItem key={plataforma.id} value={plataforma.id}>
                          {plataforma.name} ({plataforma.url})
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plano">Plano</Label>
                <Select 
                  value={planoSelecionado} 
                  onValueChange={setPlanoSelecionado}
                  disabled={!plataformaSelecionada || planosFiltrados.length === 0}
                >
                  <SelectTrigger id="plano">
                    <SelectValue placeholder={!plataformaSelecionada ? "Selecione uma plataforma primeiro" : "Selecione um plano"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Planos disponíveis</SelectLabel>
                      {planosFiltrados.map((plano) => (
                        <SelectItem key={plano.id} value={plano.id}>
                          {plano.name} - R$ {plano.price.toFixed(2).replace('.', ',')}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
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
