import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { POPULATION_CONFIG } from '@/lib/config/POPULATION_CONFIG'
import { toast } from 'sonner'
import { insertEstablishment } from '@/server/actions/insert-establishment'
import { EstablishmentFormValues } from '@/server/actions/insert-establishment' 

const formSchema = z.object({
  establishment: z.string().min(1, 'Required'),
  street: z.string().min(1, 'Required'),
})

interface AddEstablishmentProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddEstablishment({ open, setOpen, onSuccess }: AddEstablishmentProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<EstablishmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: '',
      establishment: '',
      street: '',
      buildingNumber: '',
      buildingType: '',
      waterSource: '',
      toiletType: '',
    },
  })

  async function onSubmit(values: EstablishmentFormValues) {
    try {
      setIsSubmitting(true)
      const response = await insertEstablishment(values)
      
      toast('Success', {
        description: 'Establishment has been successfully added.',
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      })

      setOpen(false)
      form.reset()
      onSuccess?.()
    } catch (error) {
      console.error('Error submitting form:', error)

      
      toast('Error', {
        description: 'Failed to add establishment. Please try again.',
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      })

    } finally {
      setIsSubmitting(false)
    }

  }

  const FormSection = ({ children, title }: { children: React.ReactNode, title: string }) => (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      {children}
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">New Establishment</DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <FormSection title="Basic Information">
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="ownerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Owner Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter owner name" 
                            {...field}
                            className="bg-background h-9"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="establishment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background h-9">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {POPULATION_CONFIG.establishment_type_r.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </FormSection>

              <FormSection title="Location">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Street</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background h-9">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {POPULATION_CONFIG.streetOptions2.map((street) => (
                                <SelectItem key={street.value} value={street.value}>
                                  {street.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="buildingNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Building No.</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter number" 
                              {...field}
                              className="bg-background h-9"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="buildingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Building Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background h-9">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {POPULATION_CONFIG.type_of_bldg.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </FormSection>

              <FormSection title="Utilities">
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="waterSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Water Source</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background h-9">
                              <SelectValue placeholder="Select source" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {POPULATION_CONFIG.water_source.map((source) => (
                              <SelectItem key={source.value} value={source.value}>
                                {source.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="toiletType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Toilet Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background h-9">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {POPULATION_CONFIG.toilet_type.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </FormSection>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="ghost"
                type="button"
                onClick={() => setOpen(false)}
                className="h-9"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="h-9"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}