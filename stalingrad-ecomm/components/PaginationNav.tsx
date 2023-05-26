import Link from "next/link";

interface IPaginationNavProps {
  currentPage: number;
  totalPages: number;
  linkPredicate: string;
}

export function PaginationNav({currentPage, totalPages, linkPredicate}: IPaginationNavProps) {
  
  if (totalPages === 1) {
    return null;
  }
  const pagesLinkList = new Array(totalPages);
  for (let i=0; i < pagesLinkList.length; i++) {
    const pageNumber = i+1;
    if (pageNumber === currentPage) {
      pagesLinkList[i] = <li key={linkPredicate+String(pageNumber)}>{pageNumber}</li>
      continue;
    }
    pagesLinkList[i] = <li key={linkPredicate+String(pageNumber)}><Link href={linkPredicate+String(pageNumber)}>{pageNumber}</Link></li>
  }

  return <ol>{pagesLinkList}</ol>
}