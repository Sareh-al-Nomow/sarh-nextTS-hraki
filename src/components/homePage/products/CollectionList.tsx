import HorizontalProductList from "./HorizontalProductList";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "@/lib/axios/collectionsAxios";
import { Collection } from "@/lib/models/collectionModal";
import { transformProductToCollectionCartItem } from "@/utils/trnsformProductsCollecionCardOItem";

interface CollectionListProp {
  collection: Collection;
}

const CollectionList: React.FC<CollectionListProp> = ({ collection }) => {
  const { data: collectionsdData } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });

  const displayedProducts = collection.products.map(
    transformProductToCollectionCartItem
  );

  console.log(collectionsdData);
  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50">
      <HorizontalProductList
        title={collection.name}
        products={displayedProducts}
      />
    </div>
  );
};

export default CollectionList;
