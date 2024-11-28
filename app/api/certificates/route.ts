import dbConnect from "@/lib/db";
import Certificate from "@/models/Certificate";
import { NextResponse } from "next/server";
import xlsx from "xlsx";

export async function POST(req: Request) {
  await dbConnect();

  const data = await req.formData();
  const file = data.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(sheet);

  try {
    for (const row of jsonData) {
      await Certificate.create({
        certificateId: row.certificateId,
        studentName: row.studentName,
        internshipDomain: row.internshipDomain,
        startDate: new Date(row.startDate),
        endDate: new Date(row.endDate),
      });
    }

    return NextResponse.json({ message: "Data uploaded successfully" });
  } catch (error) {
    console.error("Error uploading data:", error);
    return NextResponse.json(
      { error: "Error uploading data" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Certificate ID is required" },
      { status: 400 }
    );
  }

  try {
    const certificate = await Certificate.findOne({ certificateId: id });

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(certificate);
  } catch (error) {
    console.error("Error retrieving certificate:", error);
    return NextResponse.json(
      { error: "Error retrieving certificate" },
      { status: 500 }
    );
  }
}
