import { useParams } from "next/navigation";

export function useFeatureFlagId() {
  const params = useParams<{ featureFlagId: string }>();

  return params.featureFlagId;
}
