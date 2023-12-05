import '@styles/globals.css'

interface ILayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: ILayoutProps) {
  return (
    <div>
      {/* config */}
      <div>
        {/* check auth */}
        <div>
          {/* store provider */}
          <div className='relative flex h-screen flex-col'>
            <>
              <section className='flex flex-auto items-stretch bg-white'>{children}</section>
            </>
          </div>
        </div>
      </div>
    </div>
  )
}
