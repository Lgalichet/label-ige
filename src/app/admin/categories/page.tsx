import { getCategories } from '@/actions/categories'
import { CategoriesClient } from '@/components/admin/CategoriesClient'

export const dynamic = 'force-dynamic'

export default async function AdminCategoriesPage() {
  const categories = await getCategories()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Catégories</h1>
        <p className="text-[#555B6E] text-sm mt-1">
          Organisez les articles du blog par thème. Chaque catégorie a sa propre page publique.
        </p>
      </div>
      <CategoriesClient
        initial={categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          _count: c._count,
        }))}
      />
    </div>
  )
}
