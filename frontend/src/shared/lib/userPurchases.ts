import { API_URL } from './api'

export function getUserPurchasedBooks(userId?: string): string[] {
  const booksSet = new Set<string>()

  // 1. Check user-specific storage
  if (userId) {
    try {
      const raw = localStorage.getItem(`purchased_books_${userId}`)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          parsed.forEach((b) => booksSet.add(b))
        }
      }
    } catch (err) {
      console.error('Failed to parse user purchased books:', err)
    }
  }

  // 2. Check session purchase key mv_ebook_purchased
  try {
    const globalRaw = localStorage.getItem('mv_ebook_purchased')
    if (globalRaw) {
      const parsedGlobal = JSON.parse(globalRaw)
      if (parsedGlobal?.bookId) {
        if (parsedGlobal.bookId === 'combo-bundle') {
          booksSet.add('jivan-jitvu-che')
          booksSet.add('man-haryu-to-badhu-haryu')
          booksSet.add('combo-bundle')
        } else {
          booksSet.add(parsedGlobal.bookId)
        }
      }
    }
  } catch (err) {
    console.error('Failed to parse global purchased books:', err)
  }

  return Array.from(booksSet)
}

export function isBookOwned(userId: string | undefined, bookId: string): boolean {
  const owned = getUserPurchasedBooks(userId)
  if (owned.includes('combo-bundle')) return true
  if (owned.includes(bookId)) return true
  if (owned.includes('jivan-jitvu-che') && owned.includes('man-haryu-to-badhu-haryu')) return true
  return false
}

export function addPurchasedBook(userId: string | undefined, bookId: string): string[] {
  try {
    const owned = getUserPurchasedBooks(userId)
    if (!owned.includes(bookId)) {
      const updated = [...owned, bookId]
      if (userId) {
        localStorage.setItem(`purchased_books_${userId}`, JSON.stringify(updated))
      }
      localStorage.setItem(
        'mv_ebook_purchased',
        JSON.stringify({
          orderId: 'ORDER_RESTORED',
          paymentId: 'PAYMENT_RESTORED',
          bookId,
        })
      )
      window.dispatchEvent(new Event('purchases_updated'))
      return updated
    }
    return owned
  } catch (err) {
    console.error('Failed to save purchased book:', err)
    return []
  }
}

export async function syncUserPurchasesFromBackend(userId?: string, userEmail?: string): Promise<string[]> {
  if (!userEmail) return getUserPurchasedBooks(userId)
  try {
    const res = await fetch(`${API_URL}/api/payment/my-purchased-books?email=${encodeURIComponent(userEmail.trim())}`)
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data?.purchasedBooks) && data.purchasedBooks.length > 0) {
        data.purchasedBooks.forEach((bId: string) => {
          addPurchasedBook(userId, bId)
        })
      }
    }
  } catch (err) {
    console.error('Failed to sync purchases from backend:', err)
  }
  return getUserPurchasedBooks(userId)
}
