import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    domains: ["timepay-tracker-s3.s3.eu-north-1.amazonaws.com", "example.com"],
  },
};

export default withFlowbiteReact(nextConfig);
