import { useState, useEffect } from "react";
import { MatchData } from "@/components/molecules/MatchCard";

export function useFetchFixtures() {
  const [fixtures, setFixtures] = useState<MatchData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllFixtures = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/fixtures?league=1&season=2022`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-apisports-key": process.env.NEXT_PUBLIC_API_FOOTBALL_KEY as string,
            },
          }
        );

        // ini cm buat liat request count
        const currentCount = parseInt(localStorage.getItem("pitchside_api_count") || "0") + 1;
        localStorage.setItem("pitchside_api_count", currentCount.toString());
        console.group(`Request ke #${currentCount}`);

        const result = await response.json();
        console.log("RESPON API-FOOTBALL:", result);
        if (result.errors && Object.keys(result.errors).length > 0) {
          throw new Error("Couldnt get schedule data from API-Football");
        }


        const transformedFixtures: MatchData[] = result.response.map((apiData: any) => {
          let matchStatus: "finished" | "upcoming" | "live" = "upcoming";
          if (["1H", "2H", "HT", "ET", "P"].includes(apiData.fixture.status.short)) matchStatus = "live";
          if (["FT", "AET", "PEN"].includes(apiData.fixture.status.short)) matchStatus = "finished";

          return {
            id: apiData.fixture.id.toString(),
            time: new Date(apiData.fixture.date).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }),
            round: apiData.league.round,
            stadium: apiData.fixture.venue.name,
            status: matchStatus,
            homeTeam: {
              name: apiData.teams.home.name,
              flagUrl: apiData.teams.home.logo,
              score: apiData.goals.home,
              penaltyScore: apiData.score.penalty.home,
            },
            awayTeam: {
              name: apiData.teams.away.name,
              flagUrl: apiData.teams.away.logo,
              score: apiData.goals.away,
              penaltyScore: apiData.score.penalty.away,
            },
          };
        });

        setFixtures(transformedFixtures);
      } catch (err: any) {
        setError(err.message || "Error while finding Schedule");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllFixtures();
  }, []);

  return { fixtures, isLoading, error };
}