'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";

interface ConfirmarAcaoModalProps {
  aberto: boolean;
  titulo: string;
  mensagem: string;
  botaoConfirmarTexto: string;
  botaoConfirmarVariante: 'default' | 'destructive' | 'outline';
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export function ConfirmarAcaoModal({
  aberto,
  titulo,
  mensagem,
  botaoConfirmarTexto,
  botaoConfirmarVariante = 'destructive',
  onConfirm,
  onCancel
}: ConfirmarAcaoModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={aberto} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{titulo}</DialogTitle>
          <DialogDescription>
            {mensagem}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2 pt-2">
          <Button 
            variant="outline" 
            onClick={onCancel}
            disabled={loading}
            className="mt-0"
          >
            Cancelar
          </Button>
          <Button
            variant={botaoConfirmarVariante}
            onClick={handleConfirm}
            disabled={loading}
            className="mt-0"
          >
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {botaoConfirmarTexto}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
