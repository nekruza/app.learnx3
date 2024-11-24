"use client"
import React, { useEffect } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CssBaseline } from "@mui/material"
import "./globals.css"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ClerkProvider, SignedOut, SignedIn, RedirectToSignIn } from "@clerk/nextjs"
import Script from "next/script"
import Head from "next/head"
import Clarity from '@microsoft/clarity';


export default function RootLayout({ children }: any) {
	const [queryClient] = React.useState(() => new QueryClient())

	const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
	const analyticsCode = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
	const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

	useEffect(() => {
		if (clarityProjectId && process.env.NEXT_PUBLIC_NODE_ENV === "production") {
			Clarity.init(clarityProjectId)
		}
	}, [clarityProjectId])

	return (
		<html lang="en">
			<body>
				<Script async strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${analyticsCode}`} />
				{/* Inline script for Google Analytics */}
				<Script strategy="lazyOnload">
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
                    gtag('js', new Date());
                    gtag('config', "${analyticsCode}");
          `}
				</Script>
				<QueryClientProvider client={queryClient}>
					<CssBaseline />
					{/* <Hydrate state={children.dehydratedState}> */}
					<ClerkProvider publishableKey={clerkPubKey}>
						<SignedIn>{children}</SignedIn>
						<SignedOut>
							<RedirectToSignIn />
						</SignedOut>
					</ClerkProvider>
					{/* </Hydrate> */}
					<ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
				</QueryClientProvider>
			</body>
		</html>
	)
}
