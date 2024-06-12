import * as z from "zod"

export const tournamentFormSchema = z.object({
  title: z.string().min(3, 'Название должно содержать минимум 3 символа'),
  description: z.string().min(3, 'Описание должно содержать минимум 3 символа').max(400, 'Описание должно содержать не более 400 символов'),
  location: z.string().min(3, 'Место должно содержать минимум 3 символа').max(400, 'Место должно содержать не более 400 символов'),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url('Неверная ссылка')
})