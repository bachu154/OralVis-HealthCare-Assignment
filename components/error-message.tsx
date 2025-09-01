"use client"

type Props = { message?: string }

export default function ErrorMessage({ message }: Props) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="mt-4 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700 shadow-sm"
    >
      <p className="font-semibold">Oops! Something went wrong.</p>
      <p className="text-sm">{message || "Please try again later."}</p>
    </div>
  )
}
