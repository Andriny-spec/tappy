'use client';

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  AlertCircle, 
  Save,
  CreditCard,
  User,
  Bell,
  Shield,
  MessageSquare,
  Mail,
  Smartphone,
  Globe,
  Lock,
  Info
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ConfiguracoesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Configurações</h1>
        <p className="text-gray-500 dark:text-gray-400">Gerencie todas as configurações do sistema.</p>
      </div>
      
      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="bg-gray-100 dark:bg-gray-800 mb-6">
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="integracao">Integrações</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
        </TabsList>
        
        {/* Configurações de Perfil */}
        <TabsContent value="perfil">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-[#25D366]" /> 
                Configurações de Perfil
              </CardTitle>
              <CardDescription>
                Gerencie suas informações de perfil e preferências da conta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informações Pessoais</h3>
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" defaultValue="Administrador Tappy" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="admin@tappy.id" type="email" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" defaultValue="(11) 98765-4321" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cargo">Cargo</Label>
                    <Input id="cargo" defaultValue="Administrador" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferências da Conta</h3>
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-emails">Emails de Marketing</Label>
                      <div className="text-sm text-muted-foreground">Receber novidades, ofertas e atualizações</div>
                    </div>
                    <Switch id="marketing-emails" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="resumo-semanal">Resumo Semanal</Label>
                      <div className="text-sm text-muted-foreground">Receber um resumo semanal das atividades</div>
                    </div>
                    <Switch id="resumo-semanal" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                <Save className="h-4 w-4 mr-2" /> Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Configurações de Pagamentos */}
        <TabsContent value="pagamentos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[#25D366]" /> 
                Configurações de Pagamentos
              </CardTitle>
              <CardDescription>
                Configure os métodos de pagamento para seus clientes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Métodos de Pagamento</h3>
                <Separator />
                
                {/* PIX */}
                <Card className="border-border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">PIX</CardTitle>
                      <Switch id="enable-pix" defaultChecked />
                    </div>
                    <CardDescription>Pagamentos com PIX via OpenPix</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="pix-appid">App ID</Label>
                        <Input id="pix-appid" placeholder="Seu App ID do OpenPix" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pix-wallet">Wallet ID</Label>
                        <Input id="pix-wallet" placeholder="ID da carteira para recebimentos" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Cartão de Crédito */}
                <Card className="border-border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Cartão de Crédito</CardTitle>
                      <Switch id="enable-credit" defaultChecked />
                    </div>
                    <CardDescription>Pagamentos com cartão de crédito via Stripe</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="stripe-key">Chave de API (Publishable Key)</Label>
                        <Input id="stripe-key" placeholder="pk_live_..." />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="stripe-secret">Chave Secreta (Secret Key)</Label>
                        <Input id="stripe-secret" type="password" placeholder="sk_live_..." />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Cartão de Débito */}
                <Card className="border-border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Cartão de Débito</CardTitle>
                      <Switch id="enable-debit" defaultChecked />
                    </div>
                    <CardDescription>Pagamentos com cartão de débito via Stripe</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 p-3 rounded-md">
                      <Info className="h-4 w-4" />
                      <span>As configurações de cartão de débito utilizam as mesmas chaves do cartão de crédito.</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                <Save className="h-4 w-4 mr-2" /> Salvar Configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Configurações de Notificações */}
        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#25D366]" /> 
                Configurações de Notificações
              </CardTitle>
              <CardDescription>
                Configure como e quando você recebe notificações.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notificações por Email</h3>
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Novos assinantes</Label>
                      <div className="text-sm text-muted-foreground">Quando um novo assinante se cadastrar</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Pagamentos recebidos</Label>
                      <div className="text-sm text-muted-foreground">Quando um pagamento for confirmado</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Cancelamentos</Label>
                      <div className="text-sm text-muted-foreground">Quando uma assinatura for cancelada</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Falhas de pagamento</Label>
                      <div className="text-sm text-muted-foreground">Quando um pagamento não puder ser processado</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notificações no Aplicativo</h3>
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mostrar todas as notificações</Label>
                      <div className="text-sm text-muted-foreground">Exibir todas as notificações no painel</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Som de notificações</Label>
                      <div className="text-sm text-muted-foreground">Reproduzir som quando novas notificações chegarem</div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                <Save className="h-4 w-4 mr-2" /> Salvar Preferências
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Integrações */}
        <TabsContent value="integracao">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#25D366]" /> 
                Integrações
              </CardTitle>
              <CardDescription>
                Configure integrações com serviços externos e APIs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">API do Tappy</h3>
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="api-key">Chave da API</Label>
                  <div className="flex">
                    <Input id="api-key" readOnly value="tpy_live_xxxxxxxxxxxxxxxxxxxx" className="rounded-r-none" />
                    <Button variant="outline" className="rounded-l-none border-l-0">Copiar</Button>
                  </div>
                  <div className="text-sm text-muted-foreground pt-1">Use esta chave para acessar a API do Tappy em suas aplicações.</div>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline">Regenerar Chave</Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Webhooks</h3>
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">URL do Webhook</Label>
                  <Input id="webhook-url" placeholder="https://seusite.com/webhook" />
                  <div className="text-sm text-muted-foreground pt-1">Receba notificações em tempo real quando eventos ocorrerem.</div>
                </div>
                
                <div className="space-y-2">
                  <Label>Eventos a monitorar</Label>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="evento-pagamento" defaultChecked />
                      <Label htmlFor="evento-pagamento">Pagamentos</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="evento-assinante" defaultChecked />
                      <Label htmlFor="evento-assinante">Assinantes</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="evento-cancelamento" defaultChecked />
                      <Label htmlFor="evento-cancelamento">Cancelamentos</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                <Save className="h-4 w-4 mr-2" /> Salvar Integrações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Segurança */}
        <TabsContent value="seguranca">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#25D366]" /> 
                Segurança da Conta
              </CardTitle>
              <CardDescription>
                Configure opções de segurança para proteger sua conta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Autenticação</h3>
                <Separator />
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  
                  <Button variant="outline" className="mt-2">
                    <Lock className="h-4 w-4 mr-2" /> Alterar Senha
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Verificação em Duas Etapas</h3>
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Ativar verificação em duas etapas</Label>
                      <div className="text-sm text-muted-foreground">Proteja sua conta com uma camada adicional de segurança</div>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="telefone-2fa">Telefone para Verificação</Label>
                    <Input id="telefone-2fa" placeholder="(11) 98765-4321" disabled />
                    <div className="text-sm text-muted-foreground pt-1">Ative a verificação em duas etapas primeiro.</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sessões Ativas</h3>
                <Separator />
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Sessão Atual</div>
                      <div className="text-sm text-muted-foreground">MacOS • Chrome • São Paulo, Brasil</div>
                    </div>
                    <div className="text-sm text-green-600">Ativa agora</div>
                  </div>
                </div>
                
                <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
                  Encerrar todas as outras sessões
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                <Save className="h-4 w-4 mr-2" /> Salvar Configurações de Segurança
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
