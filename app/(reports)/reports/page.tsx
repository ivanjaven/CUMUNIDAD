import { ChartBatPopulationByStreets } from '@/components/cartBarPopulationbystreets'
import { ChartBatPopulationByAge } from '@/components/chartBarAge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Users, TrendingUp } from 'lucide-react'

export default function PopulationReport() {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          Population Analytics Dashboard
        </h1>
        <p className="text-muted-foreground">
          Comprehensive analysis of population distribution across streets and
          age groups
        </p>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="bg-primary/5">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <CardTitle className="text-sm font-medium">
                Total Population
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Analysis by Location</div>
            <p className="text-xs text-muted-foreground">
              Street-wise distribution of residents
            </p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <CardTitle className="text-sm font-medium">
                Demographics
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Age Distribution</div>
            <p className="text-xs text-muted-foreground">
              Population segments by age categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="lg:col-span-1">
          <ChartBatPopulationByStreets />
        </div>
        <div className="lg:col-span-1">
          <ChartBatPopulationByAge />
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-8 text-sm text-muted-foreground">
        <p className="text-center">
          Data is updated in real-time. Last refresh:{' '}
          {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
