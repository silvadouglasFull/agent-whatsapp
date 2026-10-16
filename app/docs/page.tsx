/**
 * @file app/docs/page.tsx
 * @description Renders the Swagger UI interactive documentation page.
 */

"use client";

import { JSX } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

/**
 * Documentation page component.
 * 
 * @returns {JSX.Element} The rendered Swagger UI container.
 */
export default function ApiDocsPage(): JSX.Element {
  return (
    <main className="swagger-container p-4">
      <SwaggerUI url="/api/docs" />
    </main>
  );
}