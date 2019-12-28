import slugify from "slugify";
import { databaseRef } from "../firebase";
import Idea from "./Idea";

//TODO: Turn this into a real-time watcher, so it gets automatically updated.
export const fetchAllIdeas = async (): Promise<Idea[]> => {
  let listOfIdeas: Idea[] = [];
  const querySnapshot = await databaseRef.collection("ideas").get();
  listOfIdeas = querySnapshot.docs.map(doc => {
    const newIdea = { ...doc.data() as Idea, slug: doc.id };
    return newIdea;
  });
  return listOfIdeas;
};
//TODO: Should this return a single idea, or the entire updated list?
export const addIdea = async (newIdea: Idea): Promise<Idea> => {
  const newIdeaSlug = slugify(newIdea.summary);
  await databaseRef
    .collection("ideas")
    .doc(newIdeaSlug)
    .set(newIdea, { merge: true });
  const addedIdea = await databaseRef
    .collection("ideas")
    .doc(newIdeaSlug)
    .get();
  return addedIdea.data() as Idea;
};
export const fetchSpecificIdea = async (ideaID: string): Promise<Idea> => {
  //TODO: Maybe I should abstract this to just ideasDB so I don't have to keep writing it out.
  const docRef = databaseRef.collection("ideas").doc(ideaID);
  let ideaSnapshot = await docRef.get();

  if (ideaSnapshot.exists) {
    // console.log("Document data:", ideaSnapshot.data());
    return { ...ideaSnapshot.data() as Idea, slug: ideaSnapshot.id };
  } else {
    // doc.data() will be undefined in this case
    // console.log("No such document!");
    throw new Error("No such document!");
  }

  //TODO: Add updateIdea(ideaID) function
};
