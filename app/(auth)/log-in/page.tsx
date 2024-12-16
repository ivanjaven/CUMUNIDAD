import Link from 'next/link'
import { UserAuthForm } from '@/components/user-auth-form'
import Image from 'next/image'

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/bambang.jpg"
            alt="Government Building"
            layout="fill"
            objectFit="cover"
            className="brightness-[0.3]"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/bambanglogo.png"
              alt="Bambang Logo"
              width={64}
              height={64}
              className="mr-2"
            />
            <span className="text-2xl font-bold">Bambang</span>
          </div>
        </div>
        <div className="relative z-20 mt-auto">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Welcome to Bambang Portal
            </h2>
            <p className="text-lg text-gray-300">
              Your secure gateway to efficient and reliable public
              administration services.
            </p>
          </div>
          <blockquote className="mt-8 space-y-2">
            <p className="text-lg italic text-gray-300">
              &ldquo;Secure access to government services and resources. Your
              gateway to efficient and reliable public administration.&rdquo;
            </p>
            <footer className="text-sm font-medium text-gray-400">
              Department of Digital Services
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login to your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Clean your fingertip. Place finger flat on the sensor.
          </p>
        </div>
      </div>
    </div>
  )
}
