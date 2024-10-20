import * as React from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { fromUTCtoLocal, toUTC } from "../helpers/localTime"
import { LessonTimetableType } from "@/types/types"
import { Dayjs } from "dayjs"
const dayjs = require("dayjs")
const utc = require("dayjs/plugin/utc")
dayjs.extend(utc)

const DatePickerX = React.memo(
	({
		calendarValue,
		setCalendarValue,
	}: {
		calendarValue: Dayjs | null | string
		setCalendarValue: React.Dispatch<React.SetStateAction<LessonTimetableType>>
	}) => {
		return (
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateTimePicker
					sx={{ width: "100%" }}
					label="Controlled picker"
					ampm={false}
					value={fromUTCtoLocal(calendarValue || "")}
					onChange={(newValue) => setCalendarValue((prev) => ({ ...prev, lesson_date: toUTC(newValue) }))}
				/>
			</LocalizationProvider>
		)
	}
)

export default DatePickerX
