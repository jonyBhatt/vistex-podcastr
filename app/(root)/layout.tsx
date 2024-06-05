export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main>
        <p>Leftsidebar</p>
        {children}
        <p>RightSidebar</p>
      </main>
    </div>
  );
}
