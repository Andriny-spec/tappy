/**
 * Utilitário para gerenciar a persistência de sessão e token
 * Isso ajuda a evitar a expiração frequente de sessão
 */
export const SessionStorage = {
  // Salvar o token de sessão localmente
  saveSession: (token: string) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token);
        
        // Atualizar o timestamp da última atividade
        localStorage.setItem('last_activity', new Date().toISOString());
      }
    } catch (error) {
      console.error('Erro ao salvar sessão:', error);
    }
  },

  // Verificar se o usuário tem uma sessão válida
  hasValidSession: () => {
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        const lastActivity = localStorage.getItem('last_activity');
        
        if (!token || !lastActivity) return false;
        
        // Verificar se a última atividade foi há menos de 24 horas
        const lastActivityTime = new Date(lastActivity).getTime();
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - lastActivityTime;
        
        // 24 horas em milissegundos = 86400000
        return timeDiff < 86400000;
      }
    } catch (error) {
      console.error('Erro ao verificar sessão:', error);
    }
    
    return false;
  },

  // Atualizar o timestamp da última atividade
  updateActivity: () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('last_activity', new Date().toISOString());
      }
    } catch (error) {
      console.error('Erro ao atualizar atividade:', error);
    }
  },

  // Limpar a sessão
  clearSession: () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('last_activity');
      }
    } catch (error) {
      console.error('Erro ao limpar sessão:', error);
    }
  }
};
