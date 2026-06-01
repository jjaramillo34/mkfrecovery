import { Column, Heading, Text } from "@once-ui-system/core";
import type { ReactNode } from "react";

export function AdminPage({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Column fillWidth gap="24" paddingY="8">
      <Column gap="8" fillWidth>
        <Heading as="h1" variant="display-strong-s">
          {title}
        </Heading>
        {description != null && (
          typeof description === "string" ? (
            <Text variant="body-default-m" onBackground="neutral-weak">
              {description}
            </Text>
          ) : (
            description
          )
        )}
      </Column>
      {children}
    </Column>
  );
}
