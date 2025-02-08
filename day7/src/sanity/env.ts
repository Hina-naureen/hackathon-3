export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-20'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const token = assertValue(
 "skLvHK9Zf47SuSpJiPaF9L9rtGGRbW3xqt4tcEt8FrL6yz9OoedR79TNfp5qNAPQA7kqRkeSrlEKnh6au1i8ECklYs1DBs1qLMtRqvo6mtuGW8LsQdMJ5X1esG8NjLAOCOAcSgc2cFSAYue6lHkSrr86UTRZ81GubUSllnnf9M3jpspOFwjC",
  'Missing environment variable:SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
