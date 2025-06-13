"use client";

import React from "react";
import CollectionList from "./CollectionList";
import { Collection } from "@/lib/models/collectionModal";
interface CollectionsProps {
  collections: Collection[];
}
const Collections: React.FC<CollectionsProps> = ({ collections }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50">
      {collections.map((collection) => (
        <CollectionList
          key={collection.collection_id}
          collection={collection}
        />
      ))}
    </div>
  );
};

export default Collections;
