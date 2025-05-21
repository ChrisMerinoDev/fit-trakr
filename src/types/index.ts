export interface PageParams {
  id: string;
}

export interface PageProps {
  params: Promise<PageParams>;
}

export interface APIParams {
  params: {
    id: string;
  };
}

export interface APIProps {
  params: Promise<APIParams>;
}
