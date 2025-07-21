"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { useTasks } from "@/context/taskContext"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radial chart with stacked sections"

const chartConfig = {
  completed: {
    label: "Completed",
    color: "#8BCE89",
  },
  pending: {
    label: "Pending",
    color:  "#EB4E31",
  },
} satisfies ChartConfig

function RadioChart() {
  const {tasks, completedTasks, activeTasks} = useTasks();
  const taskTotal = tasks.length;

  const chartData = [
    {
      pending: activeTasks.length,
      completed: completedTasks.length,
    },
  ]

  return (
    <Card className="flex flex-col gap-0 border-2 border-gray-700 shadow-none bg-gray-400">
      <CardHeader className="items-center pb-0">
        <CardTitle>Completed vs Pending Tasks</CardTitle>
        <CardDescription className="text-gray-800">Task completion status.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[200px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={60}
            outerRadius={100}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {taskTotal}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground text-black"
                        >
                          Tasks
                        </tspan>
                      </text>
                    )
                  }
                  return null
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="pending"
              stackId="a"
              cornerRadius={5}
              fill={chartConfig.pending.color}
              className="stroke-transparent stroke-2"
            />
           <RadialBar
              dataKey="completed"
              stackId="b"
              cornerRadius={5}
              fill={chartConfig.completed.color}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="mt-0 flex-col gap-1 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Task completion improved by 12% this month{" "} <TrendingUp className="h-5 w-5" />
        </div>
        
      </CardFooter>
    </Card>
  )
}

export default RadioChart
