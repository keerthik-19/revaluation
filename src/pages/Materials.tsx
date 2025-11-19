import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Plus, Package, DollarSign, Calendar, X, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageSelector } from "../components/LanguageSelector";
import { useState } from "react";

interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  totalCost: number;
  supplier?: string;
  status: "ordered" | "delivered" | "pending" | "installed";
  orderDate?: string;
  deliveryDate?: string;
  project: string;
}

const Materials = () => {
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);

  const [materials, setMaterials] = useState<Material[]>([
    {
      id: "1",
      name: "Granite Countertop",
      quantity: 45,
      unit: "sq ft",
      costPerUnit: 75,
      totalCost: 3375,
      supplier: "Stone World",
      status: "delivered",
      orderDate: "2024-11-01",
      deliveryDate: "2024-11-10",
      project: "Kitchen Remodel",
    },
    {
      id: "2",
      name: "Ceramic Tiles",
      quantity: 200,
      unit: "sq ft",
      costPerUnit: 8,
      totalCost: 1600,
      supplier: "Tile Masters",
      status: "ordered",
      orderDate: "2024-11-05",
      deliveryDate: "2024-11-18",
      project: "Bathroom Renovation",
    },
    {
      id: "3",
      name: "Kitchen Cabinets",
      quantity: 12,
      unit: "units",
      costPerUnit: 450,
      totalCost: 5400,
      supplier: "Cabinet Pro",
      status: "installed",
      orderDate: "2024-10-15",
      deliveryDate: "2024-10-28",
      project: "Kitchen Remodel",
    },
    {
      id: "4",
      name: "Pressure-treated Lumber",
      quantity: 150,
      unit: "board ft",
      costPerUnit: 6,
      totalCost: 900,
      supplier: "Local Lumber Yard",
      status: "pending",
      project: "Deck Addition",
    },
  ]);

  const handleAddMaterial = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const quantity = Number(formData.get("quantity"));
    const costPerUnit = Number(formData.get("costPerUnit"));
    const newMaterial: Material = {
      id: String(materials.length + 1),
      name: formData.get("name") as string,
      quantity,
      unit: formData.get("unit") as string,
      costPerUnit,
      totalCost: quantity * costPerUnit,
      supplier: formData.get("supplier") as string,
      status: "pending",
      orderDate: formData.get("orderDate") as string,
      project: formData.get("project") as string,
    };
    setMaterials([...materials, newMaterial]);
    setShowAddMaterialModal(false);
  };

  const totalMaterialCost = materials.reduce((sum, m) => sum + m.totalCost, 0);
  const deliveredCount = materials.filter((m) => m.status === "delivered").length;
  const pendingCount = materials.filter((m) => m.status === "pending" || m.status === "ordered").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "ordered":
        return "bg-blue-100 text-blue-800";
      case "installed":
        return "bg-purple-100 text-purple-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
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
              <h1 className="text-3xl font-bold" style={{ color: "#10B981" }}>
                Materials Tracking
              </h1>
              <p style={{ color: "#10B981" }}>Optional: Track materials and suppliers for your projects</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Button
              style={{ backgroundColor: "#059669", color: "white" }}
              className="gap-2"
              onClick={() => setShowAddMaterialModal(true)}
            >
              <Plus className="h-4 w-4" />
              Add Material
            </Button>
          </div>
        </div>

        {/* Info Banner */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-blue-900">Optional Feature</p>
              <p className="text-sm text-blue-800 mt-1">
                This materials tracking section is optional. Many contractors already have their own supplier
                relationships and ordering systems. Use this if it helps your workflow!
              </p>
            </div>
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{ color: "#10B981" }}>
                  Total Material Cost
                </p>
                <p className="text-3xl font-bold" style={{ color: "#10B981" }}>
                  ${totalMaterialCost.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{ color: "#10B981" }}>
                  Delivered
                </p>
                <p className="text-3xl font-bold" style={{ color: "#10B981" }}>
                  {deliveredCount}
                </p>
                <p className="text-sm mt-1" style={{ color: "#10B981" }}>
                  materials
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{ color: "#10B981" }}>
                  Pending/Ordered
                </p>
                <p className="text-3xl font-bold" style={{ color: "#10B981" }}>
                  {pendingCount}
                </p>
                <p className="text-sm mt-1" style={{ color: "#10B981" }}>
                  materials
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Package className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Materials List */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4" style={{ color: "#10B981" }}>
            Material Orders
          </h3>
          <div className="space-y-4">
            {materials.map((material) => (
              <div
                key={material.id}
                className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-lg" style={{ color: "#10B981" }}>
                      {material.name}
                    </h4>
                    <Badge className={getStatusColor(material.status)}>
                      {material.status.charAt(0).toUpperCase() + material.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                    <div>
                      <p className="text-xs" style={{ color: "#10B981" }}>
                        Quantity
                      </p>
                      <p className="font-medium" style={{ color: "#10B981" }}>
                        {material.quantity} {material.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: "#10B981" }}>
                        Cost
                      </p>
                      <p className="font-medium" style={{ color: "#10B981" }}>
                        ${material.totalCost.toLocaleString()}
                      </p>
                    </div>
                    {material.supplier && (
                      <div>
                        <p className="text-xs" style={{ color: "#10B981" }}>
                          Supplier
                        </p>
                        <p className="font-medium" style={{ color: "#10B981" }}>
                          {material.supplier}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs" style={{ color: "#10B981" }}>
                        Project
                      </p>
                      <p className="font-medium" style={{ color: "#10B981" }}>
                        {material.project}
                      </p>
                    </div>
                  </div>
                  {(material.orderDate || material.deliveryDate) && (
                    <div className="flex gap-4 mt-3 text-sm" style={{ color: "#10B981" }}>
                      {material.orderDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Ordered: {new Date(material.orderDate).toLocaleDateString()}
                        </span>
                      )}
                      {material.deliveryDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Delivery: {new Date(material.deliveryDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" style={{ borderColor: "#10B981", color: "#10B981" }}>
                    Edit
                  </Button>
                  {material.supplier && (
                    <Button variant="outline" size="sm" style={{ borderColor: "#10B981", color: "#10B981" }}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Add Material Modal */}
      {showAddMaterialModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowAddMaterialModal(false)}
        >
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "#10B981" }}>
                  Add Material
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setShowAddMaterialModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <form onSubmit={handleAddMaterial} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: "#10B981" }}>
                      Material Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Granite Countertop"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: "#10B981" }}>
                      Project *
                    </label>
                    <input
                      type="text"
                      name="project"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Kitchen Remodel"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: "#10B981" }}>
                      Quantity *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="45"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: "#10B981" }}>
                      Unit *
                    </label>
                    <input
                      type="text"
                      name="unit"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="sq ft"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: "#10B981" }}>
                      Cost Per Unit *
                    </label>
                    <input
                      type="number"
                      name="costPerUnit"
                      required
                      step="0.01"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="75"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: "#10B981" }}>
                      Supplier (Optional)
                    </label>
                    <input
                      type="text"
                      name="supplier"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Stone World"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: "#10B981" }}>
                      Order Date
                    </label>
                    <input
                      type="date"
                      name="orderDate"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddMaterialModal(false)}
                    style={{ borderColor: "#10B981", color: "#10B981" }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" style={{ backgroundColor: "#059669", color: "white" }} className="flex-1">
                    Add Material
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

export default Materials;
