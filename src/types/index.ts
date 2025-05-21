export interface PageParams {
  id: string;
}

export interface PageProps {
  params: Promise<PageParams>;
}
