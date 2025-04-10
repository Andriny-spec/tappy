'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircle, Loader2, AlertCircle } from 'lucide-react';
import { createPlan } from '@/lib/actions/plan';
import { getAllPlatforms } from '@/lib/actions/platform';

export default function PlanosActions() {
  const router = useRouter();
  const [tab, setTab] = useState('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState<Array<{ id: string, name: string, slug: string }>>([]);
  const [isLoadingPlatforms, setIsLoadingPlatforms] = useState(false);
  
  // Estado do formulário com valores padrão
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    platformId: '', // Será definido após carregar as plataformas
    price: 0,
    interval: 'monthly', // Valor padrão
    features: [''],
    checkoutLink: '',
    isActive: true,
  });

  // Carregar as plataformas quando o componente montar
  useEffect(() => {
    const loadPlatforms = async () => {
      try {
        setIsLoadingPlatforms(true);
        const { platforms: fetchedPlatforms, error } = await getAllPlatforms();
        
        if (error) {
          console.error('Erro ao carregar plataformas:', error);
          return;
        }
        
        setPlatforms(fetchedPlatforms);
        
        // Define o platformId inicial para a primeira plataforma, se disponível
        if (fetchedPlatforms.length > 0) {
          setFormValues(prev => ({
            ...prev,
            platformId: fetchedPlatforms[0].id
          }));
        }
      } catch (err) {
        console.error('Erro ao carregar plataformas:', err);
      } finally {
        setIsLoadingPlatforms(false);
      }
    };
    
    loadPlatforms();
  }, []);

  const handleTabChange = (value: string) => {
    setTab(value);
  };

  const handleFormChange = (field: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Função para adicionar um novo campo de feature
  const addFeature = () => {
    setFormValues(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  // Função para atualizar um campo de feature específico
  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = [...formValues.features];
    updatedFeatures[index] = value;
    setFormValues(prev => ({
      ...prev,
      features: updatedFeatures
    }));
  };

  // Função para remover um campo de feature
  const removeFeature = (index: number) => {
    const updatedFeatures = formValues.features.filter((_, i) => i !== index);
    setFormValues(prev => ({
      ...prev,
      features: updatedFeatures.length > 0 ? updatedFeatures : ['']
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setFormError(null);

      // Filtra features vazias
      const filteredFeatures = formValues.features.filter(f => f.trim() !== '');
      
      // Prepara os dados para envio
      const planData = {
        ...formValues,
        price: Number(formValues.price),
        features: filteredFeatures.length > 0 ? filteredFeatures : ['Recurso básico'],
      };

      const response = await createPlan(planData);

      if (response.error) {
        setFormError(response.error);
        return;
      }

      // Reseta o formulário e fecha o modal
      setFormValues({
        name: '',
        description: '',
        platformId: 'tappyid',
        price: 0,
        interval: 'monthly',
        features: [''],
        checkoutLink: '',
        isActive: true,
      });
      
      setIsModalOpen(false);
      router.refresh(); // Atualiza a página para mostrar o novo plano
    } catch (err) {
      console.error('Erro ao criar plano:', err);
      setFormError('Ocorreu um erro ao criar o plano. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold dark:text-gray-100">Planos Disponíveis</h2>
      <div className="flex items-center gap-4">
        <Tabs defaultValue="todos" value={tab} onValueChange={handleTabChange}>
          <TabsList className="bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="todos">
              Todos
            </TabsTrigger>
            <TabsTrigger value="tappyid">
              Tappy ID
            </TabsTrigger>
            <TabsTrigger value="tappywhats">
              Tappy WhatsApp
            </TabsTrigger>
            <TabsTrigger value="tappyimob">
              Tappy Imob
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-[#25D366] hover:bg-[#128C7E] text-white"
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Novo Plano
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Plano</DialogTitle>
              <DialogDescription>
                Preencha os detalhes do novo plano de assinatura.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-800 text-sm p-2 rounded">
                  {formError}
                </div>
              )}
              
              <div className="grid gap-2">
                <Label htmlFor="name">Nome do Plano</Label>
                <Input 
                  id="name" 
                  value={formValues.name} 
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  placeholder="Ex: Plano Básico"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description" 
                  value={formValues.description} 
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  placeholder="Descreva as características do plano"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="platformId">Plataforma</Label>
                  {isLoadingPlatforms ? (
                    <div className="flex items-center gap-2 h-10 px-3 border rounded-md bg-gray-50">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-gray-500">Carregando plataformas...</span>
                    </div>
                  ) : platforms.length === 0 ? (
                    <div className="flex items-center gap-2 h-10 px-3 border rounded-md bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-500">Erro ao carregar plataformas</span>
                    </div>
                  ) : (
                    <Select 
                      value={formValues.platformId} 
                      onValueChange={(value) => handleFormChange('platformId', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma plataforma" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((platform) => (
                          <SelectItem key={platform.id} value={platform.id}>
                            {platform.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    min="0" 
                    step="0.01"
                    value={formValues.price} 
                    onChange={(e) => handleFormChange('price', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="interval">Intervalo de Cobrança</Label>
                <Select 
                  value={formValues.interval} 
                  onValueChange={(value) => handleFormChange('interval', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o intervalo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Mensal</SelectItem>
                    <SelectItem value="quarterly">Trimestral</SelectItem>
                    <SelectItem value="semiannual">Semestral</SelectItem>
                    <SelectItem value="annual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="checkoutLink">Link de Checkout</Label>
                <Input 
                  id="checkoutLink" 
                  value={formValues.checkoutLink} 
                  onChange={(e) => handleFormChange('checkoutLink', e.target.value)}
                  placeholder="Ex: https://checkout.stripe.com/pay/cs_test_..." 
                />
                <p className="text-xs text-gray-500">Link para o checkout do plano (Stripe, PayPal, etc.)</p>
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>Recursos do Plano</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addFeature}
                  >
                    Adicionar Recurso
                  </Button>
                </div>
                
                {formValues.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input 
                      value={feature} 
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Ex: 10 usuários incluídos"
                    />
                    {formValues.features.length > 1 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeFeature(index)}
                        className="h-8 w-8"
                      >
                        &times;
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <Switch 
                  id="isActive" 
                  checked={formValues.isActive} 
                  onCheckedChange={(checked) => handleFormChange('isActive', checked)}
                />
                <Label htmlFor="isActive">Plano ativo</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button 
                type="button" 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="bg-[#25D366] hover:bg-[#128C7E] text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Enviando...
                  </>
                ) : 'Criar Plano'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
