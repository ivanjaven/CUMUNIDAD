'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { fetchEInit } from '@/server/queries/fetch-e-init'
import { initETypedef } from '@/lib/typedef/init-e-typedef'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AlertCircle, Loader2, Save, X } from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { updateEstablisment } from '@/server/actions/update-establisment'
import { POPULATION_CONFIG } from '@/lib/config/POPULATION_CONFIG'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type FormFields = keyof initETypedef

interface EditSheetProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly query: number;
}

interface FormError {
  field: FormFields;
  message: string;
}

export function EditSheet({ isOpen, onClose, query }: EditSheetProps): JSX.Element {

  const [formData, setFormData] = useState<initETypedef | undefined>()
  const [originalData, setOriginalData] = useState<initETypedef | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<FormError[]>([])

  useEffect(() => {
    const fetchAllData = async (): Promise<void> => {
      if (!isOpen || !query) return
      
      setIsLoading(true)
      setError(null)
      try {
        const [initData] = await Promise.all([
          fetchEInit(query),
        ])

        if (!initData?.[0]) {
          throw new Error('No resident data found')
        }

        const initialFormData: initETypedef = {
          ...initData[0],
          id: String(initData[0].id ?? ''),
          owner: String(initData[0].owner ?? ''),
          type_id: String(initData[0].type_id ?? ''),
          street: String(initData[0].street ?? ''),
          building_no: String(initData[0].building_no ?? ''),
          housing_type: String(initData[0].housing_type ?? ''),
          water: String(initData[0].water ?? ''),
          toilet: String(initData[0].toilet ?? ''),
        }

        setFormData(initialFormData)
        setOriginalData(initialFormData)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch resident data'
        setError(errorMessage)
        toast.error('Error', {
          description: errorMessage,
          action: { label: 'Undo', onClick: () => console.log('Undo') },
        })
      } finally {
        setIsLoading(false)
      }
    }

    void fetchAllData()
  }, [isOpen, query])

  const hasChanges = useCallback((): boolean => {
    if (!formData || !originalData) return false
    
    return Object.keys(formData).some(key => {
      const field = key as keyof initETypedef
      return formData[field] !== originalData[field]
    })
  }, [formData, originalData])

  const onFormDataChange = useCallback((fieldId: FormFields, value: string): void => {
    setFormData((prevData) => {
      if (!prevData) return prevData
      return {
        ...prevData,
        [fieldId]: value
      }
    })
    // Clear any previous errors for this field
    setFormErrors(prev => prev.filter(error => error.field !== fieldId))
  }, [])

  const handleSave = async () => {
 
    if (!formData) return
  
    setIsSaving(true)
    try {
      console.log(formData)
     await updateEstablisment(formData)
      setOriginalData(formData)
      toast.success('Success', {
        description: 'Establishment data updated successfully',
        action: { label: 'Undo', onClick: () => console.log('Undo') },
      })
      onClose()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update establishment'
      toast.error('Error', {
        description: errorMessage,
        action: { label: 'Undo', onClick: () => console.log('Undo') },
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading || !formData) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-[640px]">
          <SheetHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-semibold">Edit Record</SheetTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Separator />
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm text-muted-foreground">Loading resident data...</p>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  if (error) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-[640px]">
          <SheetHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-semibold">Edit Record</SheetTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Separator />
          </SheetHeader>
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </SheetContent>
      </Sheet>
    )
  }

  const getErrorForField = (field: FormFields): string | undefined => {
    const error = formErrors.find(e => e.field === field)
    return error?.message
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[640px] p-0">
        <SheetHeader className="p-6 sticky top-0 bg-background z-10 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-semibold">Edit Record</SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-10rem)] px-6">
          <div className="space-y-8 py-6">
            {/* Owner Input */}
            <div className="space-y-2">
              <Label htmlFor="owner">Owner</Label>
              <Input
                id="owner"
                value={formData.owner}
                onChange={(e) => onFormDataChange('owner', e.target.value)}
                className={getErrorForField('owner') ? 'border-red-500' : ''}
              />
              {getErrorForField('owner') && (
                <p className="text-sm text-red-500">{getErrorForField('owner')}</p>
              )}
            </div>

            {/* Type ID Select */}
            <div className="space-y-2">
              <Label htmlFor="type_id">Type ID</Label>
              <Select
                value={formData.type_id}
                onValueChange={(value) => onFormDataChange('type_id', value)}
              >
                <SelectTrigger className={getErrorForField('type_id') ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                            {POPULATION_CONFIG.establishment_type_r.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                 </SelectContent>
              </Select>
              {getErrorForField('type_id') && (
                <p className="text-sm text-red-500">{getErrorForField('type_id')}</p>
              )}
            </div>

            {/* Street Select */}
            <div className="space-y-2">
              <Label htmlFor="street">Street</Label>
              <Select
                value={formData.street}
                onValueChange={(value) => onFormDataChange('street', value)}
              >
                <SelectTrigger className={getErrorForField('street') ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select street" />
                </SelectTrigger>
                <SelectContent>
                              {POPULATION_CONFIG.streetOptions2.map((street) => (
                                <SelectItem key={street.value} value={street.value}>
                                  {street.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
              </Select>
              {getErrorForField('street') && (
                <p className="text-sm text-red-500">{getErrorForField('street')}</p>
              )}
            </div>

            {/* Building Number Input */}
            <div className="space-y-2">
              <Label htmlFor="building_no">Building Number</Label>
              <Input
                id="building_no"
                value={formData.building_no}
                onChange={(e) => onFormDataChange('building_no', e.target.value)}
                className={getErrorForField('building_no') ? 'border-red-500' : ''}
              />
              {getErrorForField('building_no') && (
                <p className="text-sm text-red-500">{getErrorForField('building_no')}</p>
              )}
            </div>

            {/* Housing Type Select */}
            <div className="space-y-2">
              <Label htmlFor="housing_type">Housing Type</Label>
              <Select
                value={formData.housing_type}
                onValueChange={(value) => onFormDataChange('housing_type', value)}
              >
                <SelectTrigger className={getErrorForField('housing_type') ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select housing type" />
                </SelectTrigger>
                <SelectContent>
                            {POPULATION_CONFIG.type_of_bldg.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
              </Select>
              {getErrorForField('housing_type') && (
                <p className="text-sm text-red-500">{getErrorForField('housing_type')}</p>
              )}
            </div>

            {/* Water Select */}
            <div className="space-y-2">
              <Label htmlFor="water">Water Source</Label>
              <Select
                value={formData.water}
                onValueChange={(value) => onFormDataChange('water', value)}
              >
                <SelectTrigger className={getErrorForField('water') ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select water source" />
                </SelectTrigger>
                <SelectContent>
                            {POPULATION_CONFIG.water_source.map((source) => (
                              <SelectItem key={source.value} value={source.value}>
                                {source.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
              </Select>
              {getErrorForField('water') && (
                <p className="text-sm text-red-500">{getErrorForField('water')}</p>
              )}
            </div>

            {/* Toilet Select */}
            <div className="space-y-2">
              <Label htmlFor="toilet">Toilet Type</Label>
              <Select
                value={formData.toilet}
                onValueChange={(value) => onFormDataChange('toilet', value)}
              >
                <SelectTrigger className={getErrorForField('toilet') ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select toilet type" />
                </SelectTrigger>
                <SelectContent>
                            {POPULATION_CONFIG.toilet_type.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
              </Select>
              {getErrorForField('toilet') && (
                <p className="text-sm text-red-500">{getErrorForField('toilet')}</p>
              )}
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="sticky bottom-0 w-full p-6 bg-background border-t">
          <div className="flex w-full gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              className="flex-1"
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-primary"
              onClick={handleSave}
              disabled={isSaving || formErrors.length > 0 || !hasChanges()}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save changes
                </>
              )}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
      </Sheet>
  )
}
