import React from 'react'
import ContentTables from '../../components/contentTables'
import Sidebar from '../../components/sidebar'

export default function ContentList() {
   return (
      <>
         <Sidebar>
            <ContentTables/>
         </Sidebar>
      </>
   )
}
