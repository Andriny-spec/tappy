import { z } from 'zod';

/**
 * Esquema de validação para planos
 */
export const PlanSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  platformId: z.string(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  features: z.array(z.string()),
  benefits: z.array(z.string()).optional().default([]),
  price: z.number().min(0),
  discount: z.number().min(0).optional(),
  setupFee: z.number().min(0).optional(),
  additionalUserPrice: z.number().min(0).optional(),
  interval: z.string(),
  checkoutLink: z.string().optional(),
  maxUsers: z.number().int().min(1).optional(),
  maxItems: z.number().int().min(1).optional(),
  maxStorage: z.number().int().min(1).optional(),
  maxTokens: z.number().int().min(1).optional(),
  hasMultiChannel: z.boolean().default(false),
  hasAI: z.boolean().default(false),
  hasReports: z.boolean().default(true),
  hasClientPortal: z.boolean().default(false),
  hasTeamManagement: z.boolean().default(false),
  hasLeadManagement: z.boolean().default(true),
  hasSalesTools: z.boolean().default(true),
  hasRentalManagement: z.boolean().default(false),
  isUnlimited: z.boolean().default(false),
  isActive: z.boolean().default(true),
  isHighlighted: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  color: z.string().optional(),
  displayOrder: z.number().int().min(0).default(0),
});

export type PlanFormValues = z.infer<typeof PlanSchema>;
