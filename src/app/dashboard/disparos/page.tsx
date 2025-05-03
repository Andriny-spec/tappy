'use client';

import { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import {
  SendHorizontal,
  Mail,
  Users,
  Upload,
  Calendar as CalendarIcon,
  Check,
  Clock,
  PlusCircle,
  X,
  MessageSquare,
  Filter,
  Search,
  Eye
} from "lucide-react";

// Tipos para os disparos
type DisparoStatus = "AGENDADO" | "ENVIADO" | "FALHA" | "PROCESSANDO";

type Disparo = {
  id: string;
  titulo: string;
  tipo: "EMAIL" | "WHATSAPP";
  conteudo: string;
  destinatarios: string[];
  status: DisparoStatus;
  dataAgendamento?: Date;
  dataCriacao: Date;
  dataEnvio?: Date;
  criadoPor: string;
};

// Componente principal
export default function DisparosPage() {
  const [activeTab, setActiveTab] = useState("todos");
  const [disparos, setDisparos] = useState<Disparo[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para o formulário de novo disparo
  const [novoDisparoOpen, setNovoDisparoOpen] = useState(false);
  const [tipoDisparo, setTipoDisparo] = useState<"EMAIL" | "WHATSAPP">("EMAIL");
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [arquivoDestinatarios, setArquivoDestinatarios] = useState<File | null>(null);
  const [destinatariosManual, setDestinatariosManual] = useState("");
  const [agendar, setAgendar] = useState(false);
  const [dataAgendamento, setDataAgendamento] = useState<Date | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estado para filtros
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [filtroPeriodo, setFiltroPeriodo] = useState<string>("ultimo-mes");
  const [busca, setBusca] = useState("");

  // Carregar disparos (simulado)
  useEffect(() => {
    const carregarDisparos = () => {
      setLoading(true);
      // Simular chamada à API
      setTimeout(() => {
        const dadosSimulados: Disparo[] = [
          {
            id: "disp-001",
            titulo: "Newsletter de Maio",
            tipo: "EMAIL",
            conteudo: "Confira as novidades do mês de Maio na Tappy!",
            destinatarios: ["cliente1@email.com", "cliente2@email.com", "cliente3@email.com"],
            status: "ENVIADO",
            dataCriacao: new Date(2025, 4, 1, 10, 30),
            dataEnvio: new Date(2025, 4, 1, 11, 0),
            criadoPor: "Admin"
          },
          {
            id: "disp-002",
            titulo: "Promoção Dia das Mães",
            tipo: "WHATSAPP",
            conteudo: "Olá! Temos uma promoção especial para o Dia das Mães. Confira em nosso site!",
            destinatarios: ["+5511999998888", "+5511999997777"],
            status: "AGENDADO",
            dataCriacao: new Date(2025, 4, 2, 9, 0),
            dataAgendamento: new Date(2025, 4, 5, 12, 0),
            criadoPor: "Admin"
          },
          {
            id: "disp-003",
            titulo: "Confirmação de Pagamento",
            tipo: "EMAIL",
            conteudo: "Seu pagamento foi confirmado. Obrigado pela preferência!",
            destinatarios: ["cliente4@email.com"],
            status: "FALHA",
            dataCriacao: new Date(2025, 4, 3, 14, 45),
            criadoPor: "Admin"
          }
        ];
        
        setDisparos(dadosSimulados);
        setLoading(false);
      }, 1000);
    };
    
    carregarDisparos();
  }, [activeTab, filtroTipo, filtroStatus, filtroPeriodo, busca]);

  // Funções para manipulação de disparos
  const handleArquivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setArquivoDestinatarios(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar
    if (!titulo) {
      toast.error("O título é obrigatório");
      return;
    }
    
    if (!conteudo) {
      toast.error("O conteúdo é obrigatório");
      return;
    }
    
    if (!arquivoDestinatarios && !destinatariosManual) {
      toast.error("Adicione destinatários para continuar");
      return;
    }
    
    if (agendar && !dataAgendamento) {
      toast.error("Selecione uma data de agendamento");
      return;
    }
    
    // Processar destinatários do campo manual
    destinatariosManual
      .split(/[,;\n]/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    // Simulando o envio para a API
    toast.success(agendar ? "Disparo agendado com sucesso!" : "Disparo realizado com sucesso!");
    
    // Limpar formulário
    resetForm();
    setNovoDisparoOpen(false);
  };
  
  const resetForm = () => {
    setTitulo("");
    setConteudo("");
    setTipoDisparo("EMAIL");
    setArquivoDestinatarios(null);
    setDestinatariosManual("");
    setAgendar(false);
    setDataAgendamento(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Renderização da badge de status
  const renderStatus = (status: DisparoStatus) => {
    switch(status) {
      case "ENVIADO":
        return <Badge className="bg-[#dcf8c6] text-[#075e54] hover:bg-[#dcf8c6] border-[#25D366] border"><Check className="h-3 w-3 mr-1" /> ENVIADO</Badge>;
      case "AGENDADO":
        return <Badge variant="outline" className="text-blue-600 border-blue-300 dark:text-blue-400"><Clock className="h-3 w-3 mr-1" /> AGENDADO</Badge>;
      case "PROCESSANDO":
        return <Badge variant="outline" className="text-amber-600 border-amber-300 dark:text-amber-400"><Clock className="h-3 w-3 mr-1" /> PROCESSANDO</Badge>;
      case "FALHA":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400"><X className="h-3 w-3 mr-1" /> FALHA</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho com estatísticas */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Disparos</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Envie mensagens em massa por Email e WhatsApp para seus clientes
          </p>
        </div>
        <Button onClick={() => setNovoDisparoOpen(true)} className="mt-4 md:mt-0 bg-[#25D366] hover:bg-[#128C7E] text-white">
          <PlusCircle className="h-4 w-4 mr-2" />
          Novo Disparo
        </Button>
      </div>
      
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50/80 to-green-100/80 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total de Disparos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{disparos.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50/80 to-blue-100/80 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Emails Enviados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{disparos.filter(d => d.tipo === "EMAIL" && d.status === "ENVIADO").length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-[#dcf8c6]/50 to-[#dcf8c6]/80 dark:from-[#128C7E]/20 dark:to-[#25D366]/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">WhatsApp Enviados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{disparos.filter(d => d.tipo === "WHATSAPP" && d.status === "ENVIADO").length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50/80 to-purple-100/80 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Agendados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{disparos.filter(d => d.status === "AGENDADO").length}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Seção de filtros */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <h2 className="text-lg font-semibold">Filtros</h2>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os tipos</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="enviado">Enviado</SelectItem>
                  <SelectItem value="agendado">Agendado</SelectItem>
                  <SelectItem value="falha">Falha</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filtroPeriodo} onValueChange={setFiltroPeriodo}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ultimo-mes">Último mês</SelectItem>
                  <SelectItem value="ultimos-3-meses">Últimos 3 meses</SelectItem>
                  <SelectItem value="ultimos-6-meses">Últimos 6 meses</SelectItem>
                  <SelectItem value="ultimo-ano">Último ano</SelectItem>
                  <SelectItem value="todos">Todo o período</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative">
                <Input
                  placeholder="Buscar..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-8"
                />
                <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500" />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      {/* Lista de disparos */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-0">
          <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-gray-100 dark:bg-gray-800 p-1">
              <TabsTrigger value="todos" className="text-xs">Todos</TabsTrigger>
              <TabsTrigger value="email" className="text-xs">Email</TabsTrigger>
              <TabsTrigger value="whatsapp" className="text-xs">WhatsApp</TabsTrigger>
              <TabsTrigger value="agendados" className="text-xs">Agendados</TabsTrigger>
            </TabsList>
            
            <Separator className="my-4" />
            
            <TabsContent value="todos" className="m-0">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin h-8 w-8 border-4 border-[#25D366] border-t-transparent rounded-full"></div>
                </div>
              ) : disparos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <SendHorizontal className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Nenhum disparo encontrado</h3>
                  <p className="text-gray-500 max-w-md">
                    Você ainda não fez nenhum disparo. Clique em &quot;Novo Disparo&quot; para começar.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {disparos.map((disparo) => (
                    <Card key={disparo.id} className="overflow-hidden border bg-background">
                      <div className={cn(
                        "h-1 w-full",
                        disparo.tipo === "EMAIL" ? "bg-blue-500" : "bg-[#25D366]"
                      )} />
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{disparo.titulo}</CardTitle>
                            <CardDescription className="mt-1">
                              {disparo.tipo === "EMAIL" ? (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  <Mail className="h-3 w-3 mr-1" /> Email
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-[#dcf8c6] text-[#075e54] border-[#25D366]">
                                  <MessageSquare className="h-3 w-3 mr-1" /> WhatsApp
                                </Badge>
                              )}
                              <span className="mx-2">•</span>
                              {renderStatus(disparo.status)}
                              <span className="mx-2">•</span>
                              <span className="text-xs">{format(new Date(disparo.dataCriacao), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Detalhes
                            </Button>
                            {disparo.status === "AGENDADO" && (
                              <Button variant="destructive" size="sm">
                                <X className="h-4 w-4 mr-1" />
                                Cancelar
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex flex-col gap-3">
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {disparo.conteudo}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="bg-gray-50">
                              <Users className="h-3 w-3 mr-1" />
                              {disparo.destinatarios.length} destinatários
                            </Badge>
                            {disparo.dataAgendamento && (
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                Agendado: {format(new Date(disparo.dataAgendamento), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                              </Badge>
                            )}
                            {disparo.dataEnvio && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <Check className="h-3 w-3 mr-1" />
                                Enviado: {format(new Date(disparo.dataEnvio), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            {/* Conteúdo para outras abas - usar mesmo padrão acima */}
            <TabsContent value="email" className="m-0">
              {/* Filtrado para mostrar apenas emails */}
            </TabsContent>
            
            <TabsContent value="whatsapp" className="m-0">
              {/* Filtrado para mostrar apenas whatsapp */}
            </TabsContent>
            
            <TabsContent value="agendados" className="m-0">
              {/* Filtrado para mostrar apenas agendados */}
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
      
      {/* Modal de Novo Disparo */}
      <Dialog open={novoDisparoOpen} onOpenChange={setNovoDisparoOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Novo Disparo</DialogTitle>
            <DialogDescription>
              Envie mensagens personalizadas via Email ou WhatsApp para seus clientes.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              {/* Tipo de disparo */}
              <div className="grid gap-2">
                <Label>Tipo de Disparo</Label>
                <div className="flex gap-4">
                  <div
                    className={cn(
                      "flex items-center gap-2 border rounded-lg p-3 cursor-pointer transition-colors",
                      tipoDisparo === "EMAIL" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setTipoDisparo("EMAIL")}
                  >
                    <Mail className={cn("h-5 w-5", tipoDisparo === "EMAIL" ? "text-blue-500" : "text-gray-500")} />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-xs text-gray-500">Enviar para endereços de email</p>
                    </div>
                  </div>
                  
                  <div
                    className={cn(
                      "flex items-center gap-2 border rounded-lg p-3 cursor-pointer transition-colors",
                      tipoDisparo === "WHATSAPP" ? "border-[#25D366] bg-[#dcf8c6]/50 dark:bg-[#25D366]/20" : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setTipoDisparo("WHATSAPP")}
                  >
                    <MessageSquare className={cn("h-5 w-5", tipoDisparo === "WHATSAPP" ? "text-[#25D366]" : "text-gray-500")} />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-xs text-gray-500">Enviar para números de telefone</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Título */}
              <div className="grid gap-2">
                <Label htmlFor="titulo">Título da Campanha</Label>
                <Input
                  id="titulo"
                  placeholder="Ex: Newsletter de Maio"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
              </div>
              
              {/* Conteúdo */}
              <div className="grid gap-2">
                <Label htmlFor="conteudo">Conteúdo</Label>
                <Textarea
                  id="conteudo"
                  placeholder={tipoDisparo === "EMAIL" ? "Digite o conteúdo do seu email..." : "Digite a mensagem do WhatsApp..."}
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  rows={6}
                  required
                />
                {tipoDisparo === "WHATSAPP" && (
                  <p className="text-xs text-gray-500">
                    <strong>Dica:</strong> Use &apos;{'{nome}'}&apos; para personalizar a mensagem com o nome do destinatário.
                  </p>
                )}
              </div>
              
              {/* Destinatários */}
              <div className="grid gap-4">
                <div>
                  <Label>Destinatários</Label>
                  <p className="text-xs text-gray-500 mt-1">
                    Adicione manualmente ou importe um arquivo CSV
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="destinatarios-manual">Adicionar manualmente</Label>
                  <Textarea
                    id="destinatarios-manual"
                    placeholder={tipoDisparo === "EMAIL" ? "exemplo1@email.com, exemplo2@email.com" : "+5511999998888, +5511999997777"}
                    value={destinatariosManual}
                    onChange={(e) => setDestinatariosManual(e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">
                    Separe os {tipoDisparo === "EMAIL" ? "emails" : "números"} por vírgula, ponto e vírgula ou nova linha
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="arquivo">Importar de arquivo</Label>
                  <div className="flex gap-2">
                    <Input
                      id="arquivo"
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleArquivoChange}
                      ref={fileInputRef}
                      className="max-w-md"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Importar
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Formatos permitidos: CSV, Excel
                  </p>
                </div>
              </div>
              
              {/* Agendamento */}
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Switch
                    id="agendar"
                    checked={agendar}
                    onCheckedChange={setAgendar}
                  />
                  <Label htmlFor="agendar">Agendar envio</Label>
                </div>
                
                {agendar && (
                  <div className="flex gap-2 items-center pt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !dataAgendamento && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dataAgendamento ? format(dataAgendamento, "PPP HH:mm", { locale: ptBR }) : "Selecione a data e hora"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dataAgendamento}
                          onSelect={(date) => setDataAgendamento(date)}
                          initialFocus
                          locale={ptBR}
                        />
                        <div className="p-3 border-t border-border">
                          <Label htmlFor="hora">Hora</Label>
                          <Input
                            id="hora"
                            type="time"
                            className="mt-1"
                            onChange={(e) => {
                              if (dataAgendamento && e.target.value) {
                                const [hours, minutes] = e.target.value.split(':').map(Number);
                                const newDate = new Date(dataAgendamento);
                                newDate.setHours(hours, minutes);
                                setDataAgendamento(newDate);
                              }
                            }}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setNovoDisparoOpen(false)}>
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className={tipoDisparo === "EMAIL" ? "bg-blue-500 hover:bg-blue-600" : "bg-[#25D366] hover:bg-[#128C7E]"}
              >
                <SendHorizontal className="h-4 w-4 mr-2" />
                {agendar ? "Agendar" : "Enviar agora"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}