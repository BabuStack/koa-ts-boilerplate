
/**
 * This will be run even before the server is started.
 * Hence use this place to initialize connection
 * to DB etc. So that if any operations fails then
 * the server will not even start and hence will
 * result in Docker restarting this container
 */
export default async function AppInit(): Promise<void> {
  // All async init must be added
  // to the below promise
  await Promise.all([]);
}