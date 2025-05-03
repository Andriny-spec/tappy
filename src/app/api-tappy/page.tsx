"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Copy, Terminal, Server, Key, Lock, Database, Play } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Componente de exemplo de código com syntax highlighting
const CodeBlock = ({ language, code }) => {
  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-900 my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <div className="text-xs text-gray-400">{language}</div>
        <button 
          onClick={() => navigator.clipboard.writeText(code)}
          className="text-gray-400 hover:text-white"
        >
          <Copy size={16} />
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-white">{code}</code>
      </pre>
    </div>
  );
};

// Componente para método de API
const ApiMethod = ({ method, endpoint, description, params = [], response }) => {
  const methodColors = {
    GET: 'bg-blue-600',
    POST: 'bg-green-600',
    PUT: 'bg-yellow-600',
    DELETE: 'bg-red-600',
  };
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-6 overflow-hidden">
      <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800">
        <span className={`${methodColors[method]} text-white px-2 py-1 rounded text-xs font-mono mr-3`}>
          {method}
        </span>
        <code className="text-sm font-mono flex-1 text-gray-800 dark:text-gray-200">{endpoint}</code>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
        
        {params.length > 0 && (
          <>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Parâmetros</h4>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Nome</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Tipo</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Requerido</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Descrição</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {params.map((param, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-4 py-2 text-sm font-mono text-gray-800 dark:text-gray-200">{param.name}</td>
                      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">{param.type}</td>
                      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">{param.required ? 'Sim' : 'Não'}</td>
                      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">{param.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Resposta</h4>
        <CodeBlock language="json" code={response} />
      </div>
    </div>
  );
};

export default function ApiTappyPage() {
  const [activeProduct, setActiveProduct] = useState('whatsapp');

  const nodeJsExample = `const { TappyClient } = require('@tappy/sdk');

const client = new TappyClient({
  apiKey: 'sua-chave-api-aqui',
  product: 'whatsapp'
});

// Enviar mensagem
client.messages.send({
  to: '5511999999999',
  body: 'Olá do Tappy!'
})
.then(response => console.log(response))
.catch(error => console.error(error));`;

  const pythonExample = `import tappy

# Inicializar cliente
client = tappy.Client(
    api_key='sua-chave-api-aqui',
    product='whatsapp'
)

# Enviar mensagem
response = client.messages.send(
    to='5511999999999',
    body='Olá do Tappy!'
)

print(response)`;

  const phpExample = `<?php
require_once 'vendor/autoload.php';

$client = new \\Tappy\\Client([
    'api_key' => 'sua-chave-api-aqui',
    'product' => 'whatsapp'
]);

// Enviar mensagem
$response = $client->messages->send([
    'to' => '5511999999999',
    'body' => 'Olá do Tappy!'
]);

print_r($response);
`;

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gradient-to-b from-background via-background to-gray-50/50 dark:to-gray-900/20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 border-b border-gray-800">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[url(/api-pattern.svg)] bg-repeat opacity-5"></div>
            <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-tappyGreen/10 blur-3xl rounded-full"></div>
            <div className="absolute left-0 top-0 w-1/2 h-1/2 bg-tappyGreen/10 blur-3xl rounded-full"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center justify-center p-2 bg-tappyGreen/20 rounded-full mb-6">
                <Code className="w-8 h-8 text-tappyGreen" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                API Tappy<span className="text-tappyGreen">.</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Integre os produtos Tappy à sua aplicação de forma simples e rápida.
                APIs RESTful com documentação completa e SDKs para as principais linguagens.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-tappyGreen hover:bg-tappyGreen/90 text-gray-900 font-medium px-6">
                  Iniciar integração
                </Button>
                <Button size="lg" variant="outline" className="text-black border-gray-700 hover:bg-gray-800 px-6">
                  Ver documentação
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Navegação e conteúdo da API */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Navegação lateral */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white">Produtos</h3>
                  </div>
                  <nav className="p-2">
                    <ul className="space-y-1">
                      {['whatsapp', 'imob', 'id', 'link'].map((product) => (
                        <li key={product}>
                          <button
                            onClick={() => setActiveProduct(product)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                              activeProduct === product
                                ? 'bg-tappyGreen/10 text-tappyGreen font-medium'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                            }`}
                          >
                            Tappy {product.charAt(0).toUpperCase() + product.slice(1)}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  
                  <div className="p-4 border-t border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white">Guias</h3>
                  </div>
                  <nav className="p-2">
                    <ul className="space-y-1">
                      {['Introdução', 'Autenticação', 'Webhooks', 'Limites', 'Erros'].map((guide) => (
                        <li key={guide}>
                          <button
                            className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                          >
                            {guide}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
              
              {/* Conteúdo principal */}
              <div className="lg:col-span-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Tappy {activeProduct.charAt(0).toUpperCase() + activeProduct.slice(1)} API
                  </h2>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Introdução</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      A API Tappy {activeProduct.charAt(0).toUpperCase() + activeProduct.slice(1)} permite que você integre as funcionalidades do Tappy {activeProduct.charAt(0).toUpperCase() + activeProduct.slice(1)} em sua aplicação. Com esta API, você pode enviar mensagens, gerenciar contatos, criar automações e muito mais.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Todas as requisições devem ser feitas para <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-sm">https://api.tappy.com.br/v1/{activeProduct}</code>
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Início Rápido</h3>
                    <div className="mb-4">
                      <Tabs defaultValue="nodejs" className="w-full">
                        <TabsList className="mb-2">
                          <TabsTrigger value="nodejs">Node.js</TabsTrigger>
                          <TabsTrigger value="python">Python</TabsTrigger>
                          <TabsTrigger value="php">PHP</TabsTrigger>
                        </TabsList>
                        <TabsContent value="nodejs" className="mt-0">
                          <CodeBlock language="javascript" code={nodeJsExample} />
                        </TabsContent>
                        <TabsContent value="python" className="mt-0">
                          <CodeBlock language="python" code={pythonExample} />
                        </TabsContent>
                        <TabsContent value="php" className="mt-0">
                          <CodeBlock language="php" code={phpExample} />
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Endpoints da API</h3>
                    
                    <ApiMethod 
                      method="GET"
                      endpoint={`/v1/${activeProduct}/messages`}
                      description="Retorna uma lista de mensagens paginadas."
                      params={[
                        { name: 'limit', type: 'integer', required: false, description: 'Número de mensagens por página (max: 100)' },
                        { name: 'offset', type: 'integer', required: false, description: 'Índice para paginação' },
                        { name: 'status', type: 'string', required: false, description: 'Filtrar por status (sent, delivered, read)' },
                      ]}
                      response={`{
  "data": [
    {
      "id": "msg_123abc456def",
      "to": "5511999999999",
      "body": "Olá do Tappy!",
      "status": "delivered",
      "created_at": "2025-05-01T14:32:15.000Z"
    },
    // ... mais mensagens
  ],
  "meta": {
    "total": 243,
    "limit": 10,
    "offset": 0
  }
}`}
                    />
                    
                    <ApiMethod 
                      method="POST"
                      endpoint={`/v1/${activeProduct}/messages`}
                      description="Envia uma nova mensagem."
                      params={[
                        { name: 'to', type: 'string', required: true, description: 'Número do destinatário no formato E.164' },
                        { name: 'body', type: 'string', required: true, description: 'Conteúdo da mensagem' },
                        { name: 'media_url', type: 'string', required: false, description: 'URL da mídia a ser enviada' },
                      ]}
                      response={`{
  "id": "msg_abc123def456",
  "to": "5511999999999",
  "body": "Olá do Tappy!",
  "status": "queued",
  "created_at": "2025-05-02T16:15:32.000Z"
}`}
                    />
                    
                    <ApiMethod 
                      method="GET"
                      endpoint={`/v1/${activeProduct}/messages/{id}`}
                      description="Retorna informações de uma mensagem específica."
                      params={[
                        { name: 'id', type: 'string', required: true, description: 'ID da mensagem' },
                      ]}
                      response={`{
  "id": "msg_abc123def456",
  "to": "5511999999999",
  "body": "Olá do Tappy!",
  "status": "delivered",
  "delivered_at": "2025-05-02T16:15:40.000Z",
  "read_at": null,
  "created_at": "2025-05-02T16:15:32.000Z"
}`}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Webhooks</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Configure webhooks para receber notificações em tempo real sobre eventos da sua aplicação.
                    </p>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Endpoints para configuração</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        Configure seu endpoint para receber eventos:
                      </p>
                      <code className="block p-3 bg-gray-900 text-white rounded-lg text-sm">
                        https://seu-dominio.com/webhooks/tappy-{activeProduct}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Recursos e CTA */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/30 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Recursos da API Tappy
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Nossa API foi projetada para desenvolvedores, com foco em simplicidade, desempenho e confiabilidade.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">RESTful APIs</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  APIs REST com endpoints intuitivos, códigos de status consistentes e formatos JSON.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Webhooks</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Receba notificações em tempo real sobre eventos importantes na sua aplicação.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Key className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Autenticação Segura</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Autenticação baseada em tokens JWT com controle de permissões granular.
                </p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link href="/docs" className="inline-flex items-center justify-center bg-tappyGreen hover:bg-tappyGreen/90 text-black px-6 py-3 rounded-lg font-medium transition-all gap-2">
                <Terminal className="w-5 h-5" />
                <span>Explorar documentação completa</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}