export const convertSlugToApiFormat = (slug: string) => {
  return slug.replace(' ', '-').toLowerCase()
}
