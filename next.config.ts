import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	basePath: "/react-cat-glucose-tracker",
	assetPrefix: "/react-cat-glucose-tracker/",
	images: {
		unoptimized: true,
	},
};

export default nextConfig;
