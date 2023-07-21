"use client";

import { CheckIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import {
  addToReadingList,
  isInReadingList,
  getInReadingList,
  removeFromReadingList,
} from "@/lib/books";
import LoadingMini from "@/components/loading-mini";
import { useAppContext } from "@/context/store";

export default function AddToListButton({ isbn }) {
  const { inReadingList, setInReadingList } = useAppContext();
  const [checked, setChecked] = useState(null);

  const onClickHander = (adding) => {
    if (adding) {
      addToReadingList(isbn);
    } else {
      removeFromReadingList(isbn);
    }
    setChecked(adding);
    setInReadingList(getInReadingList());
  };
  useEffect(() => {
    setChecked(isInReadingList(isbn));
  }, []);

  useEffect(() => {
    setChecked(isInReadingList(isbn));
  }, [inReadingList]);

  if (checked === null) {
    return <LoadingMini></LoadingMini>;
  }

  return (
    <button
      onClick={() => onClickHander(!checked)}
      className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
    >
      {checked ? (
        <>
          <CheckIcon className="h-5 w-5 mr-2"></CheckIcon>
          Quitar de la lista
        </>
      ) : (
        <>
          <PlusIcon className="h-5 w-5  mr-2"></PlusIcon>
          Añadir a la lista
        </>
      )}
    </button>
  );
}