'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

import { PopulationByAgeTypedef } from '@/lib/typedef/populationbyage-typedef'
import { fetchpopulationbyage } from '@/server/queries/fetch-populationbyage'
import { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'A bar chart with a custom label'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-2))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
} satisfies ChartConfig

export function ChartBatPopulationByAge() {
  const [populationData, setPopulationData] = useState<
    PopulationByAgeTypedef[]
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getPopulationData = async () => {
      try {
        const data = await fetchpopulationbyage()
        setPopulationData(data)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch data:', err)
        setError('Failed to fetch data')
        setLoading(false)
      }
    }

    getPopulationData()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={populationData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="age_category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
              hide
            />
            <XAxis dataKey="resident_count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="resident_count"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="age_category"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="resident_count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          This chart displays the distribution of age categories within the
          population
        </div>
      </CardFooter>
    </Card>
  )
}
