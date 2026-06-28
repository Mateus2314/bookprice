interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-page text-title">
      <main className="mx-auto w-full max-w-[480px] px-0">{children}</main>
    </div>
  );
}
