'use client'
import { PopulationByStreetsTypedef } from '@/lib/typedef/populationbystreets-typedef'
import { fetchpopulationbystreets } from '@/server/queries/fetch-populationbystreets'
import { useEffect, useState } from 'react'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

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

export const description = 'A bar chart with a label'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function ChartBatPopulationByStreets() {
  const [populationData, setPopulationData] = useState<
    PopulationByStreetsTypedef[]
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getPopulationData = async () => {
      try {
        const data = await fetchpopulationbystreets()
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
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="street_name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="resident_count"
              fill="var(--color-desktop)"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          This chart displays the total population count for each street
        </div>
      </CardFooter>
    </Card>
  )
}
