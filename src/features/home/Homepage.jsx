/**
 * main landing page component for the json lab application.
 * renders the hero section and dynamically iterates over the tool navigation
 * configuration to display a categorized, interactive grid of all available tools.
 * handles routing to specific tool paths upon card click.
 */

"use client";

import { toolNavigation } from "@/config/tool-navigation";
import styles from "./HomePage.module.scss";
import ToolHeader from "@/shared/ui/ToolHeader/ToolHeader";
import Link from "next/link";

const HomePage = () => {

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <ToolHeader
          title="JSON Lab"
          description="The ultimate, privacy-first toolkit for developers to edit, format,
          validate, and transform JSON data directly in the browser."
          highlight="JSON"
          titleFontSize="4rem"
          descFontSize="1.25rem"
        />
      </section>

      {/* Tools Grid Section */}
      <section className={styles.toolsContainer}>
        {toolNavigation.map((category) => (
          <div key={category.category} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{category.category}</h2>

            <div className={styles.grid}>
              {category.items.map((tool) => {
                const Icon = tool.icon;

                return (
                  <Link
                    key={tool.id}
                    href={tool.path}
                    className={styles.card}
                  >
                    <div className={styles.cardHeader}>
                      <div className={styles.iconWrapper}>
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <h3 className={styles.cardTitle}>{tool.title}</h3>

                      {tool.comingSoon && (
                        <span className={styles.comingSoonBadge}>
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className={styles.cardDescription}>
                      {tool.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;