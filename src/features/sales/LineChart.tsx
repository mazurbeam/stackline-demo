import React from 'react';
import {useAppSelector} from "../../store/hooks.ts";
import {selectSales} from "./salesSlice.ts";
import { AxisOptions } from "react-charts";
import ResizeableBox from '../../components/ResizeableBox';


const LineChart = () => {
  const sales = useAppSelector(selectSales)

  const data = sales?.map(sale => {
    label: sale.weekEnding,
  })
  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => (datum.primary as unknown) as Date
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary
      }
    ],
    []
  );

  return (
    <ResizeableBox>

    </ResizeableBox>
  );
};

export default LineChart;