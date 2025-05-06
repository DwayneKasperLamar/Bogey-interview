import {db} from "@/firebase/admin"

export async function getInterviewsByUserId(userId: string | undefined): Promise<Interview[] | null> {
  // Early return if userId is undefined
  if (!userId) {
    console.log("No userId provided to getInterviewsByUserId");
    return [];
  }

  try {
    const interviews = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return null;
  }
}


interface GetLatestInterviewsParams {
  userId?: string;  // Make userId optional in the interface
  limit?: number;
}

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
  // Destructure with defaults
  const { userId, limit = 20 } = params || {};

  try {
    // Create a base query that we'll modify based on available parameters
    let query = db
      .collection("interviews")
      .orderBy("createdAt", "desc")
      .where("finalized", "==", true);
    
    // Only add the userId condition if userId is defined
    if (userId) {
      query = query.where("userId", "!=", userId);
    }
    
    // Add the limit
    query = query.limit(limit);
    
    // Execute the query
    const interviews = await query.get();

    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (error) {
    console.error("Error fetching latest interviews:", error);
    return null;
  }
}

export async function getInterviewById(Id:string): Promise<Interview| null> {
 const Interview = await db
    .collection("interviews")
    .doc(Id)
    .get();

    return Interview.data() as Interview | null;
      

}
