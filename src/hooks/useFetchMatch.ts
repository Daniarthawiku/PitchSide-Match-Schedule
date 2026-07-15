import { useState, useEffect } from "react";

// player information 
interface PlayerData {
  num: number;
  name: string;
  pos: string;
  grid: string | null;
}

// player scores record 
interface GoalEvent {
  playerName: string;
  elapsed: number;
  extra: number | null;
  detail: string;
}

// match information
export interface TransformedMatchData {
  id: string;
  time: string;
  round: string;
  stadium: string;
  status: "finished" | "upcoming" | "live";
  minute: string;
  homeTeam: { name: string; flagUrl: string; score: number | null; penaltyScore: number | null; coach: string; lineup: PlayerData[]; subs: PlayerData[]; scorers: GoalEvent[] };
  awayTeam: { name: string; flagUrl: string; score: number | null; penaltyScore: number | null; coach: string; lineup: PlayerData[]; subs: PlayerData[]; scorers: GoalEvent[] }
  stats?: { type: string; home: string | number; away: string | number }[];
}

export function useFetchMatch(matchId: string) {
  const [data, setData] = useState<TransformedMatchData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!matchId) return;

    const fetchMatchDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/fixtures?id=${matchId}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-apisports-key": process.env.NEXT_PUBLIC_API_FOOTBALL_KEY as string,
            },
          }
        );

        const result = await response.json();

        if (result.errors && Object.keys(result.errors).length > 0) {
          throw new Error("Gagal mengambil data dari API-Football");
        }

        const apiData = result.response[0];
        
        let matchStatus: "finished" | "upcoming" | "live" = "upcoming";
        if (["1H", "2H", "HT", "ET", "P"].includes(apiData.fixture.status.short)) matchStatus = "live";
        if (["FT", "AET", "PEN"].includes(apiData.fixture.status.short)) matchStatus = "finished";

        const homeLineupData = apiData.lineups?.[0] || { startXI: [], substitutes: [], coach: { name: "TBA" } };
        const awayLineupData = apiData.lineups?.[1] || { startXI: [], substitutes: [], coach: { name: "TBA" } };

        const formatPlayer = (p: any): PlayerData => {
          const positionMap: Record<string, string> = {
            "G": "Goalkeeper",
            "D": "Defender",
            "M": "Midfielder",
            "F": "Forward",
          };

          return {
            num: p.player.number,
            name: p.player.name,
            pos: positionMap[p.player.pos] || `(${p.player.pos})`, 
            grid: p.player.grid ? p.player.grid : null,
          };
        };

        let transformedStats = [];
        if (apiData.statistics && apiData.statistics.length === 2) {
          const homeStats = apiData.statistics[0].statistics;
          const awayStats = apiData.statistics[1].statistics;
     
          transformedStats = homeStats.map((stat: any, index: number) => ({
            type: stat.type,
            home: stat.value !== null ? stat.value : 0, 
            away: awayStats[index]?.value !== null ? awayStats[index]?.value : 0,
          }));
        }

        // goal scorer logic
        const homeScorers: GoalEvent[] = [];
        const awayScorers: GoalEvent[] = [];

        if (apiData.events) {
          apiData.events.forEach((e: any) => {
            if (e.type === "Goal") {
              const isHomeEvent = e.team.id === apiData.teams.home.id;
              const isOwnGoal = e.detail === "Own Goal";
              
              const goalData: GoalEvent = {
                playerName: e.player.name,
                elapsed: e.time.elapsed,
                extra: e.time.extra || null,
                detail: e.detail
              };

              // own goal handler
              if (isHomeEvent && !isOwnGoal) homeScorers.push(goalData);
              else if (isHomeEvent && isOwnGoal) awayScorers.push(goalData);
              else if (!isHomeEvent && !isOwnGoal) awayScorers.push(goalData);
              else if (!isHomeEvent && isOwnGoal) homeScorers.push(goalData);
            }
          });
        }

        const transformed: TransformedMatchData = {
          id: matchId,
          time: new Date(apiData.fixture.date).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }),
          round: apiData.league.round,
          stadium: apiData.fixture.venue.name,
          status: matchStatus,
          minute: apiData.fixture.status.elapsed ? `${apiData.fixture.status.elapsed}'` : "",
          homeTeam: {
            name: apiData.teams.home.name,
            flagUrl: apiData.teams.home.logo,
            score: apiData.goals.home,
            penaltyScore: apiData.score.penalty.home,
            coach: homeLineupData.coach.name,
            lineup: homeLineupData.startXI.map(formatPlayer),
            subs: homeLineupData.substitutes.map(formatPlayer),
            scorers: homeScorers,
          },
          awayTeam: {
            name: apiData.teams.away.name,
            flagUrl: apiData.teams.away.logo,
            score: apiData.goals.away,
            penaltyScore: apiData.score.penalty.away,
            coach: awayLineupData.coach.name,
            lineup: awayLineupData.startXI.map(formatPlayer),
            subs: awayLineupData.substitutes.map(formatPlayer),
            scorers: awayScorers,
          },
          stats: transformedStats.length > 0 ? transformedStats : undefined, 
        };

        setData(transformed);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan saat memuat data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatchDetail();
  }, [matchId]);

  return { data, isLoading, error };
}