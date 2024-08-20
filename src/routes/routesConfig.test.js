import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routesConfig from "./routesConfig";

test("메인 페이지에서 Lines 컴포넌트를 띄운다", () => {
  const queryClient = new QueryClient();
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ["/"], // 시작 경로 설정
  });

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );

  expect(screen.getByText("노선")).toBeInTheDocument();
});

test("디테일 페이지에서 LineDetail 컴포넌트를 띄운다", () => {
  const queryClient = new QueryClient();
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ["/line/1"],
  });

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
  expect(
    screen.getByText("정보를 불러오는 중입니다. 잠시만 기다려 주세요.")
  ).toBeInTheDocument();
});
