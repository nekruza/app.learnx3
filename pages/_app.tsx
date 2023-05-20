import type { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { Hydrate, QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import "@/styles/globals.css"
import { CssBaseline } from "@mui/material"

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient()
	const [render, setRender] = useState(false)
	useEffect(() => {
		setRender(true)
	}, [])

	return render ? (
		<QueryClientProvider client={queryClient}>
			<CssBaseline />
			<Hydrate state={pageProps.dehydratedState}>
				<Component {...pageProps} />
			</Hydrate>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</QueryClientProvider>
	) : null
}
