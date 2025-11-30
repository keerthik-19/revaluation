import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { ArrowLeft, Upload, Download, Eye, Trash2, FileText, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageSelector } from "../components/LanguageSelector";
import { useState } from "react";

interface TechnicalDrawing {
  id: string;
  name: string;
  type: "blueprint" | "plan" | "elevation" | "section" | "detail" | "other";
  project: string;
  uploadDate: string;
  fileSize: string;
  uploadedBy: string;
  version?: string;
  notes?: string;
  thumbnailUrl?: string;
}

const Drawings = () => {
  const [showAddDrawingModal, setShowAddDrawingModal] = useState(false);
  const [drawingSearchQuery, setDrawingSearchQuery] = useState("");

  const [technicalDrawings, setTechnicalDrawings] = useState<TechnicalDrawing[]>([
    {
      id: "1",
      name: "Kitchen Floor Plan Rev 3",
      type: "plan",
      project: "Kitchen Remodel",
      uploadDate: "2024-11-01",
      fileSize: "2.4 MB",
      uploadedBy: "John Architect",
      version: "Rev 3",
      notes: "Final approved version",
      thumbnailUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
    },
    {
      id: "2",
      name: "Bathroom Elevation Detail",
      type: "elevation",
      project: "Bathroom Renovation",
      uploadDate: "2024-11-05",
      fileSize: "1.8 MB",
      uploadedBy: "Sarah Designer",
      version: "Rev 1",
      thumbnailUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
    },
    {
      id: "3",
      name: "Deck Construction Blueprint",
      type: "blueprint",
      project: "Deck Addition",
      uploadDate: "2024-10-20",
      fileSize: "3.1 MB",
      uploadedBy: "Mike Engineer",
      thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
    },
  ]);

  const handleAddDrawing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    // Generate thumbnail URL from uploaded file (in production, this would be handled by the backend)
    let thumbnailUrl: string | undefined;
    if (file) {
      thumbnailUrl = URL.createObjectURL(file);
    }

    const newDrawing: TechnicalDrawing = {
      id: String(technicalDrawings.length + 1),
      name: formData.get("name") as string,
      type: formData.get("type") as TechnicalDrawing["type"],
      project: formData.get("project") as string,
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : "N/A",
      uploadedBy: formData.get("uploadedBy") as string,
      version: formData.get("version") as string,
      notes: formData.get("notes") as string,
      thumbnailUrl,
    };
    setTechnicalDrawings([...technicalDrawings, newDrawing]);
    setShowAddDrawingModal(false);
  };

  const handleDeleteDrawing = (id: string) => {
    setTechnicalDrawings(technicalDrawings.filter(d => d.id !== id));
  };

  // Filter drawings based on search query
  const filteredDrawings = technicalDrawings.filter((drawing) => {
    if (!drawingSearchQuery) return true;
    const query = drawingSearchQuery.toLowerCase();
    return (
      drawing.name.toLowerCase().includes(query) ||
      drawing.project.toLowerCase().includes(query) ||
      drawing.type.toLowerCase().includes(query) ||
      drawing.uploadedBy.toLowerCase().includes(query)
    );
  });

  const getDrawingTypeColor = (type: string) => {
    switch (type) {
      case "blueprint":
        return "bg-blue-100 text-blue-800";
      case "plan":
        return "bg-purple-100 text-purple-800";
      case "elevation":
        return "bg-green-100 text-green-800";
      case "section":
        return "bg-orange-100 text-orange-800";
      case "detail":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link to="/contractor/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Technical Drawings & Plans
              </h1>
              <p className="text-gray-600">Manage blueprints, plans, and construction documents</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Button
              style={{ backgroundColor: "#3B82F6", color: "white" }}
              className="gap-2"
              onClick={() => setShowAddDrawingModal(true)}
            >
              <Upload className="h-4 w-4" />
              Upload Drawing
            </Button>
          </div>
        </div>

        {/* Search and Stats */}
        <Card className="p-6 border-t-4 border-blue-500">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-blue-700 mb-2">Drawing Library</h3>
              <p className="text-sm text-gray-600">{technicalDrawings.length} total drawings</p>
            </div>
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, project, type, or uploader..."
                value={drawingSearchQuery}
                onChange={(e) => setDrawingSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDrawings.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                {drawingSearchQuery ? `No drawings found matching "${drawingSearchQuery}"` : "No technical drawings uploaded yet. Click 'Upload Drawing' to add your first one."}
              </div>
            ) : (
              filteredDrawings.map((drawing) => (
                <Card key={drawing.id} className="p-4 hover:shadow-lg transition-all hover:scale-[1.02] border-l-4" style={{
                  borderLeftColor:
                    drawing.type === "blueprint" ? "#3B82F6" :
                      drawing.type === "plan" ? "#8B5CF6" :
                        drawing.type === "elevation" ? "#10B981" :
                          drawing.type === "section" ? "#F59E0B" :
                            drawing.type === "detail" ? "#EC4899" :
                              "#6B7280"
                }}>
                  {/* Thumbnail Image */}
                  {drawing.thumbnailUrl ? (
                    <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={drawing.thumbnailUrl}
                        alt={drawing.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gray-100">
                              <svg class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                          `;
                        }}
                      />
                      {/* Overlay badge on thumbnail */}
                      <div className="absolute top-2 left-2">
                        <Badge className={getDrawingTypeColor(drawing.type)}>
                          {drawing.type.charAt(0).toUpperCase() + drawing.type.slice(1)}
                        </Badge>
                      </div>
                      {drawing.version && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className="text-xs bg-white">
                            {drawing.version}
                          </Badge>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      <FileText className="h-16 w-16 text-gray-400" />
                      <div className="absolute top-2 left-2">
                        <Badge className={getDrawingTypeColor(drawing.type)}>
                          {drawing.type.charAt(0).toUpperCase() + drawing.type.slice(1)}
                        </Badge>
                      </div>
                      {drawing.version && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className="text-xs bg-white">
                            {drawing.version}
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}

                  <h4 className="font-semibold mb-2 text-gray-800">
                    {drawing.name}
                  </h4>
                  <div className="space-y-1 text-sm mb-3">
                    <p className="text-muted-foreground">
                      <span className="font-medium">Project:</span> {drawing.project}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium">Uploaded:</span> {new Date(drawing.uploadDate).toLocaleDateString()}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium">By:</span> {drawing.uploadedBy}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium">Size:</span> {drawing.fileSize}
                    </p>
                    {drawing.notes && (
                      <p className="text-xs italic text-muted-foreground mt-2">
                        {drawing.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteDrawing(drawing.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Add Drawing Modal */}
      {showAddDrawingModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowAddDrawingModal(false)}
        >
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-blue-700">
                  Upload Technical Drawing
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setShowAddDrawingModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <form onSubmit={handleAddDrawing} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Drawing Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Kitchen Floor Plan Rev 3"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Drawing Type *
                    </label>
                    <select
                      name="type"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="blueprint">Blueprint</option>
                      <option value="plan">Plan</option>
                      <option value="elevation">Elevation</option>
                      <option value="section">Section</option>
                      <option value="detail">Detail</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Project *
                    </label>
                    <input
                      type="text"
                      name="project"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Kitchen Remodel"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Uploaded By *
                    </label>
                    <input
                      type="text"
                      name="uploadedBy"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Architect"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Version (Optional)
                    </label>
                    <input
                      type="text"
                      name="version"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Rev 1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    File Upload *
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <input
                      type="file"
                      name="file"
                      required
                      accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png"
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Supported formats: PDF, DWG, DXF, JPG, PNG
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Additional notes about this drawing..."
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddDrawingModal(false)}
                    className="flex-1 border-gray-300 text-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" style={{ backgroundColor: "#3B82F6", color: "white" }} className="flex-1">
                    Upload Drawing
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Drawings;
