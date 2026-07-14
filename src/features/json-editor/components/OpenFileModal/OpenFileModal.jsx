"use client";

import { Input, Select, Button, Popconfirm } from "antd";
import { X, FileJson } from "lucide-react";
import { useState, useMemo } from "react";
import { useEditorStore } from "@/store/editor.store";
import styles from "./OpenFileModal.module.scss";
import { formatBytes, formatDate } from "@/shared/utils/format-helpers";
import { BaseModal } from "@/shared/ui/BaseModal/BaseModal";

// Open file modal component
const OpenFileModal = ({ isOpen, onClose, pane = "left" }) => {
  const documents = useEditorStore((state) => state.documents);
  const setActiveDocument = useEditorStore((state) => state.setActiveDocument);
  const removeDocument = useEditorStore((state) => state.removeDocument);

  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // search and sort functionality
  const filteredAndSortedDocs = useMemo(() => {
    let result = documents.filter((doc) =>
      doc.name.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchText.toLowerCase())
    );

    result.sort((a, b) => {
      if (sortBy === "date") {
        return b.lastModified - a.lastModified; // newest first
      }
      else {
        return a.name.localeCompare(b.name); // alphabetical
      }
    });

    return result;
  }, [documents, searchText, sortBy]);

  // function to select the document to open
  const handleDocumentSelect = (id) => {
    setActiveDocument(id, pane);
    onClose();
  };

  // Custom Footer
  const modalFooter = [
    <Button key="cancel" onClick={onClose} className={styles.cancelBtn}>
      Cancel
    </Button>,
  ];

  return (
    <BaseModal
      title="Open a file"
      open={isOpen}
      onCancel={onClose}
      footer={modalFooter}
      width={600}
      className={styles.modal}
    >
      {/* Controls Section */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <span className={styles.label}>Search:</span>
          <Input
            placeholder="Enter a document name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            className={styles.searchInput}
          />
        </div>
        <div className={styles.sortBox}>
          <span className={styles.label}>Sort by:</span>
          <Select
            value={sortBy}
            onChange={setSortBy}
            style={{ width: 120, height: "2.27rem" }}
            options={[
              { value: "date", label: "Date" },
              { value: "name", label: "Name" },
            ]}
          />
        </div>
      </div>

      {/* Document Count */}
      <div className={styles.countText}>
        Showing {filteredAndSortedDocs.length} documents
      </div>

      {/* Document List */}
      <div className={styles.listContainer}>
        {filteredAndSortedDocs.map((doc) => {
          const size = new Blob([doc.content]).size;

          return (
            <div key={doc.id} className={styles.listItem}>
              <div
                className={styles.docInfo}
                onClick={() => handleDocumentSelect(doc.id)}
              >
                <FileJson size={20} className={styles.icon} />
                <div className={styles.details}>
                  <h4 className={styles.docName}>{doc.name}</h4>
                  <span className={styles.docMeta}>
                    Size: {formatBytes(size)}, last opened: {formatDate(doc.lastModified)}
                  </span>
                </div>
              </div>

              {/* Popup confirm for Delete protection */}
              <Popconfirm
                title="Delete document"
                description="Are you sure you want to delete this file?"
                onConfirm={(e) => {
                  e.stopPropagation();
                  removeDocument(doc.id);
                }}
                onCancel={(e) => e.stopPropagation()}
                okText="Yes, Delete"
                cancelText="No"
                okButtonProps={{ danger: true }}
              >
                <Button
                  type="text"
                  danger
                  icon={<X size={18} />}
                  className={styles.deleteBtn}
                  onClick={(e) => e.stopPropagation()}
                />
              </Popconfirm>
            </div>
          );
        })}

        {filteredAndSortedDocs.length === 0 && (
          <div className={styles.emptyState}>No documents found.</div>
        )}
      </div>

    </BaseModal>
  );
};

export default OpenFileModal;