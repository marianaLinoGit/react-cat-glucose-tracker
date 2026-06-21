import { StoreProvider } from "@/store/StoreProvider";
import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
	title: "Nala Glucose Tracker",
	description:
		"Acompanhamento de glicemia felina com Next.js, Redux e gráficos.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body>
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	);
}
