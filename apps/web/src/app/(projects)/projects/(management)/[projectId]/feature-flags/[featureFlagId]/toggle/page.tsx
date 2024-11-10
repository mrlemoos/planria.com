import type { JSX } from "react";

import { redirectToProject } from "$/app/(projects)/projects/(management)/[projectId]/navigation";
import { AboutFlag } from "$/domains/feature-flags/about-flag";
import { Breadcrumbs } from "$/domains/feature-flags/breadcrumbs";
import { ToggleFeatureFlag } from "$/domains/feature-flags/toggle";
import {
  fetchProjectFeatureFlagById,
  fetchProjectFeatureFlagValuesPerEnvironmentByFeatureFlagId,
} from "$/server/data/projects";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: {
    featureFlagId: string;
    projectId: string;
  };
}): Promise<JSX.Element> {
  const foundFeatureFlag = await fetchProjectFeatureFlagById(
    params.featureFlagId
  );

  if (!foundFeatureFlag) {
    // TODO: handle this case better -- Looks amateurish
    return redirectToProject(params.projectId);
  }

  const foundValues =
    await fetchProjectFeatureFlagValuesPerEnvironmentByFeatureFlagId(
      params.featureFlagId
    );

  return (
    <div className="container mx-auto mb-10 mt-20 min-h-[60dvh]">
      <Breadcrumbs featureFlagSlug={foundFeatureFlag.slug} />
      <div className="flex flex-col animate-in">
        <div className="flex flex-col lg:flex-row">
          <ToggleFeatureFlag
            featureFlag={foundFeatureFlag}
            foundValues={foundValues}
          />
          <AboutFlag
            featureFlagCreatedAt={foundFeatureFlag.createdAt}
            featureFlagDefaultValue={foundFeatureFlag.defaultValue}
            featureFlagId={foundFeatureFlag.featureFlagId}
            featureFlagUpdatedAt={foundFeatureFlag.updatedAt}
            featureFlagDescription={foundFeatureFlag.description ?? ""}
            featureFlagValueType={foundFeatureFlag.valueType}
          />
        </div>
      </div>
    </div>
  );
}
