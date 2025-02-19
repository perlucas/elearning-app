import { Card, CardHeader } from 'react-bootstrap'
import Bookmark from './components/Bookmark'
import PageMetaData from '@/components/PageMetaData'

const BookmarkPage = () => {
  return (
    <>
      <PageMetaData title="Wishlist" />
      <Card className="bg-transparent border rounded-3">
        <CardHeader className="bg-transparent border-bottom">
          <h3 className="mb-0">WishList</h3>
        </CardHeader>
        <Bookmark />
      </Card>
    </>
  )
}

export default BookmarkPage
